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

<<<<<<< HEAD
if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('templates')) fs.mkdirSync('templates');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
=======
// varmista kansiot
['pdfs', 'uploads', 'templates'].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
>>>>>>> dev2
});

// multer kuville
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

<<<<<<< HEAD
  if (!isNaN(level)) {
    const index = Number(level);
    return labels[index] || '';
=======
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
>>>>>>> dev2
  }
};

<<<<<<< HEAD
  if (labels.includes(level)) {
    return level;
  }

  return '';
}

function loadTemplate(name, data, isPreview = false) {
  const templatePath = path.join(__dirname, 'templates', `${name}.html`);
  let html = fs.readFileSync(templatePath, 'utf-8');

  if (Array.isArray(data.experiences)) {
    const expHtml = data.experiences
      .map(
        (exp) => `
        <li>
          <strong>${exp.title || ''}</strong>, ${exp.company || ''} (${
          exp.city || ''
        })
          ${exp.startDate ? ` | ${exp.startDate}` : ''} - ${exp.endDate || ''}
          ${exp.description ? `<br>${exp.description}` : ''}
        </li>`
      )
      .join('');
    html = html.replace('{{experiences}}', expHtml);
  } else {
    html = html.replace('{{experiences}}', '');
  }

  if (Array.isArray(data.skills)) {
    const skillsHtml = data.skills
      .map(
        (skill) => `
=======
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
>>>>>>> dev2
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
<<<<<<< HEAD
      )
      .join('');
    html = html.replace('{{skills}}', skillsHtml);
  } else {
    html = html.replace('{{skills}}', '');
  }

  if (Array.isArray(data.educations)) {
    const eduHtml = data.educations
      .map(
        (edu) => `
        <li>
          <strong>${edu.degree || ''}</strong>, ${edu.school || ''} (${
          edu.city || ''
        })
          ${edu.startDate ? ` | ${edu.startDate}` : ''} - ${edu.endDate || ''}
          ${edu.description ? `<br>${edu.description}` : ''}
        </li>`
      )
      .join('');
    html = html.replace('{{educations}}', eduHtml);
  } else {
    html = html.replace('{{educations}}', '');
  }

  for (const key in data) {
    if (key !== 'experiences' && key !== 'educations') {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key] || '');
    }
  }

  const extraHtml = `
  ${
    data.extraEducation
      ? `
    <h3>Koulutuksen lisätiedot</h3>
    <p>${data.extraEducation}</p>
    <hr style="margin:10px 0; border:none; border-top:1px solid #ccc;">`
      : ''
  }

  ${
    data.extraWork
      ? `
    <h3>Työhön liittyvät lisätiedot</h3>
    <p>${data.extraWork}</p>`
      : ''
  }
`;

  html = html.replace('{{extraInfo}}', extraHtml);
  if (isPreview) {
    const previewStyle = `
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: transparent !important;
  }

  .cv-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: top center;
  }
  img, svg {
    max-width: 100%;
    height: auto;
  }

  /* --- Fix photo shape and scaling --- */
  .photo img, img.photo, img.profile-photo {
    display: block;
    width: 120px;
    height: 120px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(0,0,0,0.15);
  }

  /* Ensure no template backgrounds overlap the photo */
  .photo, .photo-wrapper {
    overflow: visible !important;
    background: transparent !important;
  }
  .a4-page, .cv-a4 {
    width: 595px;
    min-height: 842px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    border-radius: 6px;
    margin: 0;
    overflow: visible;
  }
</style>
<script>
  function adjustScale() {
    var pageWidth = 595; // A4 width at 72dpi
    var wrapper = document.querySelector('.cv-wrapper');
    if (!wrapper) return;

    var containerWidth = window.innerWidth;
    var containerHeight = window.innerHeight;

    var horizontalScale = (containerWidth - 40) / pageWidth;
    var verticalScale = containerHeight / (842 + 40); // allow some margin
    var scale = Math.min(horizontalScale, verticalScale, 1);

    wrapper.style.transform = 'translateX(-50%) scale(' + scale + ')';
  }

  window.addEventListener('resize', adjustScale);
  window.addEventListener('load', function () {
    var imgs = document.querySelectorAll('img');
    var loaded = 0;
    function check() {
      loaded++;
      if (loaded >= imgs.length) adjustScale();
    }
    if (imgs.length === 0) adjustScale();
    imgs.forEach(function (img) {
      if (img.complete) check();
      else img.addEventListener('load', check);
    });
  });
</script>



`;

    html = html.replace('</head>', `${previewStyle}</head>`);
    html = html.replace('<body>', '<body><div class="cv-wrapper">');
    html = html.replace('</body>', '</div></body>');
=======
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
>>>>>>> dev2
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
<<<<<<< HEAD
    let experiencesData = [];
    let educationsData = [];
    let languagesData = [];
    if (req.body.experiences) {
      try {
        experiencesData = JSON.parse(req.body.experiences);
      } catch (err) {
        console.error('Experiences parsing error:', err);
      }
    }
    if (req.body.educations) {
      try {
        educationsData = JSON.parse(req.body.educations);
      } catch (err) {
        console.error('Educations parsing error:', err);
      }
    }
    if (req.body.languages) {
      try {
        languagesData = JSON.parse(req.body.languages);
      } catch (err) {
        console.error('Languages parsing error:', err);
      }
    }
    let skillsData = [];

    if (req.body.skills) {
      try {
        skillsData = JSON.parse(req.body.skills);
      } catch (err) {
        console.error('Skills parsing error:', err);
      }
    }

    const {
      title,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      city,
      birthdate,
      driverslicense,
      website,
      linkedin,
      summary,
      template,
    } = req.body;

    const photoPath = req.file ? req.file.path : null;
    let photoHtml = '';
    if (req.file) {
      const photoData = fs.readFileSync(req.file.path);
      const photoBase64 = `data:image/${path
        .extname(req.file.path)
        .slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img class="profile-photo" src="${photoBase64}" />`;
    }

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });
    }

    const bgPath = path.join(__dirname, 'pohjat', 'cvpohja.jpg');
    let bgBase64 = '';
    if (fs.existsSync(bgPath)) {
      const bgData = fs.readFileSync(bgPath);
      bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;
    }

    const html = loadTemplate(template || 'default', {
      title,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      city,
      birthdate,
      driverslicense,
      website,
      linkedin,
      summary,
      experiences: experiencesData,
      educations: educationsData,
      skills: skillsData,
      extraWork: req.body.extraWork || '',
      extraEducation: req.body.extraEducation || '',
      photo: photoHtml,
      bgImage: bgBase64,
      language1: languagesData[0]
        ? `${languagesData[0].language} (${levelToText(
            languagesData[0].level
          )})`
        : '',
      language2: languagesData[1]
        ? `${languagesData[1].language} (${levelToText(
            languagesData[1].level
          )})`
        : '',
      language3: languagesData[2]
        ? `${languagesData[2].language} (${levelToText(
            languagesData[2].level
          )})`
        : '',
      photo: photoPath
        ? `<img src="data:image/png;base64,${fs
            .readFileSync(photoPath)
            .toString('base64')}" />`
        : '',
    });

=======
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
>>>>>>> dev2
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
<<<<<<< HEAD
    let experiencesData = [];
    let educationsData = [];
    let languagesData = [];
    let skillsData = [];

    if (req.body.experiences) {
      try {
        experiencesData = JSON.parse(req.body.experiences);
      } catch {}
    }
    if (req.body.educations) {
      try {
        educationsData = JSON.parse(req.body.educations);
      } catch {}
    }
    if (req.body.languages) {
      try {
        languagesData = JSON.parse(req.body.languages);
      } catch {}
    }
    if (req.body.skills) {
      try {
        skillsData = JSON.parse(req.body.skills);
      } catch {}
    }

    const {
      title,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      city,
      birthdate,
      driverslicense,
      website,
      linkedin,
      summary,
      template,
      extraWork,
      extraEducation,
    } = req.body;

    // ✅ Safe photo embedding
    let photoHtml = '';
    if (req.file) {
      const photoPath = req.file.path;
      const photoData = fs.readFileSync(photoPath);
      const photoBase64 = `data:image/${path
        .extname(photoPath)
        .slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img class="profile-photo" src="${photoBase64}" onload="if(window.adjustScale) adjustScale()" />`;
    }

    const html = loadTemplate(
      template || 'default',
      {
        title,
        firstName,
        lastName,
        email,
        phone,
        postalCode,
        city,
        birthdate,
        driverslicense,
        website,
        linkedin,
        summary,
        experiences: experiencesData,
        educations: educationsData,
        skills: skillsData,
        extraWork,
        extraEducation,
        photo: photoHtml,
        bgImage: '',
        language1: languagesData[0]
          ? `${languagesData[0].language} (${levelToText(
              languagesData[0].level
            )})`
          : '',
        language2: languagesData[1]
          ? `${languagesData[1].language} (${levelToText(
              languagesData[1].level
            )})`
          : '',
        language3: languagesData[2]
          ? `${languagesData[2].language} (${levelToText(
              languagesData[2].level
            )})`
          : '',
      },
      true
=======
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
>>>>>>> dev2
    );
  } catch (err) {
    console.error('Error generating preview:', err);
    res.status(500).json({ error: 'Virhe esikatselun luonnissa' });
  }
});

app.listen(4000, () => console.log('API running at http://localhost:4000'));
