const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pdfs', express.static('pdfs'));
app.use('/uploads', express.static('uploads'));

// varmista kansiot
['pdfs', 'uploads', 'templates'].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// multer kuville
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

const levelLabels = [
  'Aloittelija',
  'Perustaso',
  'Keskitaso',
  'Hyvä',
  'Erinomainen',
  'Natiivi',
];
const skillLabels = ['Aloittelija', 'Keskitaso', 'Edistynyt', 'Ammattilainen'];

const levelToText = (l) => levelLabels[l] || '';
const skillLevelToText = (l) =>
  !isNaN(l) ? skillLabels[+l] : skillLabels.includes(l) ? l : '';

const parseJSON = (str) => {
  try {
    return JSON.parse(str || '[]');
  } catch {
    return [];
  }
};

// template-lataus ja korvaus
function loadTemplate(name, data, isPreview = false) {
  let html = fs.readFileSync(
    path.join(__dirname, 'templates', `${name}.html`),
    'utf-8'
  );

  const renderList = (arr, fields) =>
    Array.isArray(arr)
      ? arr
          .map(
            (item) => `
      <li>
        <strong>${item[fields[0]] || ''}</strong>, ${item[fields[1]] || ''} (${
              item.city || ''
            })
        ${item.startDate ? ` | ${item.startDate}` : ''} - ${item.endDate || ''}
        ${item.description ? `<br>${item.description}` : ''}
      </li>`
          )
          .join('')
      : '';

  html = html
    .replace(
      '{{experiences}}',
      renderList(data.experiences, ['title', 'company'])
    )
    .replace(
      '{{educations}}',
      renderList(data.educations, ['degree', 'school'])
    )
    .replace(
      '{{skills}}',
      (data.skills || [])
        .map(
          (s) => `
      <li><strong>${s.nimi || ''}</strong> ${s.opittu ? `– ${s.opittu}` : ''} 
      ${s.taso ? `(${skillLevelToText(s.taso)})` : ''}</li>`
        )
        .join('')
    )
    .replace(
      '{{extraInfo}}',
      `
      ${
        data.extraEducation
          ? `<h3>Koulutuksen lisätiedot</h3><p>${data.extraEducation}</p><hr>`
          : ''
      }
      ${
        data.extraWork
          ? `<h3>Työhön liittyvät lisätiedot</h3><p>${data.extraWork}</p>`
          : ''
      }
    `
    );

  for (const [k, v] of Object.entries(data))
    if (!['experiences', 'educations', 'skills'].includes(k))
      html = html.replace(new RegExp(`{{${k}}}`, 'g'), v || '');

  if (isPreview) {
    html = html
      .replace(
        '</head>',
        `
        <style>
          html, body {margin:0;height:100%;display:flex;justify-content:center;align-items:center;background:#f8f9fa;}
          .cv-wrapper {width:595px;height:842px;transform-origin:center;}
          @media screen {.cv-wrapper {transform:scale(var(--scale));}}
          .cv-a4 {background:#fff;box-shadow:0 0 20px rgba(0,0,0,0.15);border-radius:6px;}
        </style>
        <script>
          function adjustScale(){
            const s=Math.min(innerWidth/595,innerHeight/842);
            document.body.style.setProperty('--scale',s);
          }
          addEventListener('resize',adjustScale);
          addEventListener('load',adjustScale);
        </script>
      </head>`
      )
      .replace('<body>', '<body><div class="cv-wrapper">')
      .replace('</body>', '</div></body>');
  }

  return html;
}

// yhteinen datan purku
function extractData(req) {
  const fields = [
    'title',
    'firstName',
    'lastName',
    'email',
    'phone',
    'postalCode',
    'city',
    'birthdate',
    'driverslicense',
    'website',
    'linkedin',
    'summary',
    'template',
    'extraWork',
    'extraEducation',
  ];
  const parsed = Object.fromEntries(fields.map((f) => [f, req.body[f] || '']));
  parsed.experiences = parseJSON(req.body.experiences);
  parsed.educations = parseJSON(req.body.educations);
  parsed.skills = parseJSON(req.body.skills);
  parsed.languages = parseJSON(req.body.languages);
  return parsed;
}

// PDF generointi
app.post('/create-cv', upload.single('photo'), async (req, res) => {
  try {
    const data = extractData(req);
    if (!data.firstName || !data.lastName || !data.email)
      return res
        .status(400)
        .json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });

    const bgPath = path.join(__dirname, 'pohjat', 'cvpohja.jpg');
    const bgImage = fs.existsSync(bgPath)
      ? `data:image/jpeg;base64,${fs.readFileSync(bgPath).toString('base64')}`
      : '';

    const photoPath = req.file?.path;
    const photo = photoPath
      ? `<img src="data:image/png;base64,${fs
          .readFileSync(photoPath)
          .toString('base64')}" style="max-width:120px;border-radius:50%;" />`
      : '';

    ['language1', 'language2', 'language3'].forEach((key, i) => {
      const lang = data.languages[i];
      data[key] = lang ? `${lang.language} (${levelToText(lang.level)})` : '';
    });

    const html = loadTemplate(data.template || 'default', {
      ...data,
      photo,
      bgImage,
    });
    const fileName = `cv_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, 'pdfs', fileName);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    await browser.close();

    res.json({ pdfPath: `/pdfs/${fileName}` });
  } catch (err) {
    console.error('Virhe CV:n luonnissa:', err);
    res.status(500).json({ error: 'Virhe CV:n luonnissa' });
  }
});

app.post('/preview-cv', upload.single('photo'), (req, res) => {
  try {
    const data = extractData(req);
    ['language1', 'language2', 'language3'].forEach((key, i) => {
      const lang = data.languages[i];
      data[key] = lang ? `${lang.language} (${levelToText(lang.level)})` : '';
    });
    res.send(
      loadTemplate(
        data.template || 'default',
        { ...data, bgImage: '', photo: '' },
        true
      )
    );
  } catch (err) {
    console.error('Error generating preview:', err);
    res.status(500).json({ error: 'Virhe esikatselun luonnissa' });
  }
});

app.listen(4000, () => console.log('API running at http://localhost:4000'));
