const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const multer = require('multer');
const cors = require('cors');

const app = express();

// ====== CORS ======
app.use(cors({
  origin: [
    'http://resumatehost.s3-website-us-east-1.amazonaws.com',
    'https://resumatehost.s3-website-us-east-1.amazonaws.com',
    'https://d71w65z8yjd54.cloudfront.net'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ====== POLUT JA KANSIOT ======
const __dirnameResolved = path.resolve();
const folders = ['pdfs', 'uploads', 'templates', 'pohjat'];
folders.forEach(folder => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
});

app.use('/pdfs', express.static(path.join(__dirnameResolved, 'pdfs')));
app.use('/uploads', express.static(path.join(__dirnameResolved, 'uploads')));

// ====== HEALTH CHECK ======
app.get('/', (req, res) => res.send('Backend is running!'));

// ====== MULTER ======
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ====== APUTOIMINNOT ======
const levelLabels = ['Aloittelija', 'Perustaso', 'Keskitaso', 'Hyvä', 'Erinomainen', 'Natiivi'];
const skillLabels = ['Aloittelija', 'Keskitaso', 'Edistynyt', 'Ammattilainen'];

function levelToText(l) {
  return levelLabels[l] || '';
}
function skillLevelToText(l) {
  return !isNaN(l) ? skillLabels[+l] : skillLabels.includes(l) ? l : '';
}

function safeJSON(str, label) {
  try {
    return str ? JSON.parse(str) : [];
  } catch (err) {
    console.error(`JSON parse error in ${label}:`, err);
    return [];
  }
}

// ====== TEMPLATE ======
function loadTemplate(name, data, isPreview = false) {
  const templatePath = path.join(__dirnameResolved, 'templates', `${name}.html`);
  if (!fs.existsSync(templatePath)) throw new Error(`Template not found: ${templatePath}`);

  let html = fs.readFileSync(templatePath, 'utf-8');

  // Listat
  const renderList = (arr, fields) =>
    Array.isArray(arr)
      ? arr.map(item => `
        <li>
          <strong>${item[fields[0]] || ''}</strong>, ${item[fields[1]] || ''} (${item.city || ''})
          ${item.startDate ? ` | ${item.startDate}` : ''} - ${item.endDate || ''}
          ${item.description ? `<br>${item.description}` : ''}
        </li>`).join('')
      : '';

  html = html
    .replace('{{experiences}}', renderList(data.experiences, ['title', 'company']))
    .replace('{{educations}}', renderList(data.educations, ['degree', 'school']))
    .replace('{{skills}}',
      (data.skills || []).map(s => `
        <li><strong>${s.nimi || ''}</strong>
        ${s.opittu ? ` – ${s.opittu}` : ''}
        ${s.taso ? `(${skillLevelToText(s.taso)})` : ''}</li>`).join('')
    )
    .replace('{{extraInfo}}', `
      ${data.extraEducation ? `<h3>Koulutuksen lisätiedot</h3><p>${data.extraEducation}</p><hr>` : ''}
      ${data.extraWork ? `<h3>Työhön liittyvät lisätiedot</h3><p>${data.extraWork}</p>` : ''}
    `);

  // Muut placeholderit
  for (const [k, v] of Object.entries(data))
    if (!['experiences', 'educations', 'skills'].includes(k))
      html = html.replace(new RegExp(`{{${k}}}`, 'g'), v || '');

  // Esikatselu
  if (isPreview) {
    html = html
      .replace('</head>', `
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
      </head>`)
      .replace('<body>', '<body><div class="cv-wrapper">')
      .replace('</body>', '</div></body>');
  }
s
  return html;
}

// ====== DATA ======
function extractData(req) {
  const f = [
    'title', 'firstName', 'lastName', 'email', 'phone', 'postalCode', 'city',
    'birthdate', 'driverslicense', 'website', 'linkedin', 'summary', 'template',
    'extraWork', 'extraEducation'
  ];
  const parsed = Object.fromEntries(f.map(key => [key, req.body[key] || '']));
  parsed.experiences = safeJSON(req.body.experiences, 'experiences');
  parsed.educations = safeJSON(req.body.educations, 'educations');
  parsed.skills = safeJSON(req.body.skills, 'skills');
  parsed.languages = safeJSON(req.body.languages, 'languages');
  return parsed;
}

// ====== CREATE CV ======
app.post('/create-cv', upload.single('photo'), async (req, res) => {
  console.log('/create-cv request received');

  try {
    const data = extractData(req);
    if (!data.firstName || !data.lastName || !data.email)
      return res.status(400).json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });

    // Tausta
    const bgPath = path.join(__dirnameResolved, 'pohjat', 'cvpohja.jpg');
    const bgImage = fs.existsSync(bgPath)
      ? `data:image/jpeg;base64,${fs.readFileSync(bgPath).toString('base64')}`
      : '';

    // Kuva
    const photoPath = req.file?.path;
    const photo = photoPath && fs.existsSync(photoPath)
      ? `<img src="data:image/png;base64,${fs.readFileSync(photoPath).toString('base64')}" style="max-width:120px;border-radius:50%;" />`
      : '';

    // Kielitasot
    ['language1', 'language2', 'language3'].forEach((key, i) => {
      const lang = data.languages[i];
      data[key] = lang ? `${lang.language} (${levelToText(lang.level)})` : '';
    });

    // Template
    const html = loadTemplate(data.template || 'default', { ...data, photo, bgImage });

    // PDF
    const fileName = `cv_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirnameResolved, 'pdfs', fileName);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    await browser.close();

    console.log('PDF created:', pdfPath);
    res.json({ pdfPath: `/pdfs/${fileName}` });

  } catch (err) {
    console.error('Virhe CV:n luonnissa:', err);
    res.status(500).json({ error: 'Virhe CV:n luonnissa', detail: String(err).slice(0, 200) });
  }
});

// ====== PREVIEW ======
app.post('/preview-cv', upload.single('photo'), (req, res) => {
  try {
    const data = extractData(req);
    ['language1', 'language2', 'language3'].forEach((key, i) => {
      const lang = data.languages[i];
      data[key] = lang ? `${lang.language} (${levelToText(lang.level)})` : '';
    });
    const html = loadTemplate(
      data.template || 'default',
      { ...data, bgImage: '', photo: '' },
      true
    );
    res.send(html);
  } catch (err) {
    console.error('Error generating preview:', err);
    res.status(500).json({ error: 'Virhe esikatselun luonnissa' });
  }
});

// ====== SERVER ======
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`API running on port ${PORT}`));
