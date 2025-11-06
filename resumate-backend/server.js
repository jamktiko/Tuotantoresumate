const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const multer = require('multer');
const cors = require('cors');

const app = express();


// CORS
app.use(cors({
  origin: [
    'http://resumatehost.s3-website-us-east-1.amazonaws.com',
    'https://resumatehost.s3-website-us-east-1.amazonaws.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Absoluuttinen polku
const __dirnameResolved = path.resolve();

// Tiedostokansiot (luodaan jos puuttuvat)
const folders = ['pdfs', 'uploads', 'templates', 'pohjat'];
folders.forEach(folder => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
});

// Staattiset tiedostot
app.use('/pdfs', express.static(path.join(__dirnameResolved, 'pdfs')));
app.use('/uploads', express.static(path.join(__dirnameResolved, 'uploads')));

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Multer-konfiguraatio
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Kielitason muunnos
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

// Template-lataus
function loadTemplate(name, data) {
  const templatePath = path.join(__dirnameResolved, 'templates', `${name}.html`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  let html = fs.readFileSync(templatePath, 'utf-8');

  // Työkokemus
  if (Array.isArray(data.experiences)) {
    const expHtml = data.experiences.map(exp => `
      <li>
        <strong>${exp.title || ''}</strong>, ${exp.company || ''} (${exp.city || ''})
        ${exp.startDate ? ` | ${exp.startDate}` : ''} - ${exp.endDate || ''}
        ${exp.description ? `<br>${exp.description}` : ''}
      </li>`).join('');
    html = html.replace('{{experiences}}', expHtml);
  } else {
    html = html.replace('{{experiences}}', '');
  }

  // Opinnot
  if (Array.isArray(data.educations)) {
    const eduHtml = data.educations.map(edu => `
      <li>
        <strong>${edu.degree || ''}</strong>, ${edu.school || ''} (${edu.city || ''})
        ${edu.startDate ? ` | ${edu.startDate}` : ''} - ${edu.endDate || ''}
        ${edu.description ? `<br>${edu.description}` : ''}
      </li>`).join('');
    html = html.replace('{{educations}}', eduHtml);
  } else {
    html = html.replace('{{educations}}', '');
  }

  // Muut placeholderit
  for (const key in data) {
    if (key !== 'experiences' && key !== 'educations') {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key] || '');
    }
  }

  return html;
}

const generatedDir = path.join(__dirname, 'public', 'generated');
if (!fs.existsSync(generatedDir)) {
  fs.mkdirSync(generatedDir, { recursive: true });
}

// 🧠 CV-luonti polku (parannettu + virhelokit)
app.post('/create-cv', upload.single('photo'), async (req, res) => {
  console.log('/create-cv request received');
  try {
    // Turvallinen JSON-parsaus
    const safeParse = (data, label) => {
      try {
        return data ? JSON.parse(data) : [];
      } catch (err) {
        console.error(`JSON parse error in ${label}:`, err);
        return [];
      }
    };

    const experiencesData = safeParse(req.body?.experiences || '[]', 'experiences');
    const educationsData = safeParse(req.body?.educations || '[]', 'educations');
    const languagesData = safeParse(req.body?.languages || '[]', 'languages');

    const {
      title, firstName, lastName, email, phone, postalCode, city,
      birthdate, driverslicense, website, linkedin, summary, template
    } = req.body;

    console.log('Body received:', {
      firstName, lastName, email, template, experiencesCount: experiencesData.length
    });

    if (!firstName || !lastName || !email) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });
    }

    const photoPath = req.file ? req.file.path : null;

    // Taustakuva
    const bgPath = path.join(__dirnameResolved, 'pohjat', 'cvpohja.jpg');
    let bgBase64 = '';
    if (fs.existsSync(bgPath)) {
      const bgData = fs.readFileSync(bgPath);
      bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;
    } else {
      console.warn('Background image not found:', bgPath);
    }

    // Profiilikuva
    let photoHtml = '';
    if (photoPath && fs.existsSync(photoPath)) {
      const photoData = fs.readFileSync(photoPath);
      const photoBase64 = `data:image/${path.extname(photoPath).slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img src="${photoBase64}" style="max-width:120px;border-radius:50%;" />`;
    }

    // Template täyttö
    const html = loadTemplate(template || 'default', {
      title, firstName, lastName, email, phone, postalCode, city,
      birthdate, driverslicense, website, linkedin, summary,
      experiences: experiencesData,
      educations: educationsData,
      photo: photoHtml,
      bgImage: bgBase64,
      language1: languagesData[0] ? `${languagesData[0].language} (${levelToText(languagesData[0].level)})` : '',
      language2: languagesData[1] ? `${languagesData[1].language} (${levelToText(languagesData[1].level)})` : '',
      language3: languagesData[2] ? `${languagesData[2].language} (${levelToText(languagesData[2].level)})` : '',
    });

    // PDF-generointi
    const fileName = `cv_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirnameResolved, 'pdfs', fileName);

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
      await browser.close();
      console.log('PDF created successfully:', pdfPath);
    } catch (pdfErr) {
      console.error('PDF generation failed:', pdfErr);
      return res.status(500).json({ error: 'PDF generation failed', detail: String(pdfErr).slice(0, 200) });
    }

    res.json({ pdfPath: `/pdfs/${fileName}` });

  } catch (err) {
    console.error('Virhe CV:n luonnissa:', err);
    res.status(500).json({ error: 'Virhe CV:n luonnissa', detail: String(err).slice(0, 200) });
  }
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running at http://localhost:${PORT}`);
});
