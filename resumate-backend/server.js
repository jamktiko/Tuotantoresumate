const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/pdfs', express.static('pdfs'));
app.use('/uploads', express.static('uploads'));

if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('templates')) fs.mkdirSync('templates');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
function levelToText(level) {
  const labels = [
    'Aloittelija',
    'Perustaso',
    'Keskitaso',
    'Hyvä',
    'Erinomainen',
    'Natiivi',
  ];
  return labels[level] || '';
}

function skillLevelToText(level) {
  const labels = ['Aloittelija', 'Keskitaso', 'Edistynyt', 'Ammattilainen'];

  if (!isNaN(level)) {
    const index = Number(level);
    return labels[index] || '';
  }

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
      <li>
        <strong>${skill.nimi || ''}</strong>
        ${skill.opittu ? ` – ${skill.opittu}` : ''}
        ${skill.taso ? ` (${skillLevelToText(skill.taso)})` : ''}
      </li>
    `
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
    width: 100%;
    height: auto;
    min-height: 100%;
    background: transparent !important;   
    display: block;                        
    overflow-x: hidden;
    overflow-y: auto;
  }

  .cv-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: top center;
    /* your scale applied in JS */
  }

  .multi-page {
    margin: 0;
    padding: 0;
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
    const pageWidth = 595;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const baseMargin = 120; // your tuned value
    const scale = (window.innerWidth - (scrollbarWidth + baseMargin)) / pageWidth;
    const wrapper = document.querySelector('.cv-wrapper');
    if (wrapper) wrapper.style.transform = 'translateX(-50%) scale(' + scale + ')';
  }
  window.addEventListener('resize', adjustScale);
  window.addEventListener('load', adjustScale);
</script>
`;

    html = html.replace('</head>', `${previewStyle}</head>`);
    html = html.replace('<body>', '<body><div class="cv-wrapper">');
    html = html.replace('</body>', '</div></body>');
  }

  return html;
}

app.post('/create-cv', upload.single('photo'), async (req, res) => {
  try {
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
    if (photoPath) {
      const photoData = fs.readFileSync(photoPath);
      const photoBase64 = `data:image/${path
        .extname(photoPath)
        .slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img src="${photoBase64}" style="max-width:120px;border-radius:50%;" />`;
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
app.post('/preview-cv', upload.single('photo'), async (req, res) => {
  try {
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

    let photoHtml = '';
    if (req.file) {
      const photoData = fs.readFileSync(req.file.path);
      const photoBase64 = `data:image/${path
        .extname(req.file.path)
        .slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img src="${photoBase64}" style="max-width:120px;border-radius:50%;" />`;
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
    );

    res.send(html);
  } catch (err) {
    console.error('Error generating preview:', err);
    res.status(500).json({ error: 'Virhe esikatselun luonnissa' });
  }
});

app.listen(4000, () => console.log('API running at http://localhost:4000'));
