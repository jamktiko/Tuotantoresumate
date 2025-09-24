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
app.use('/uploads', express.static('uploads')); // kuvat ulos

// varmista kansiot
if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
if (!fs.existsSync('templates')) fs.mkdirSync('templates');

// multer konfiguraatio kuville
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// apufunktio: lataa template ja korvaa placeholderit
function loadTemplate(name, data) {
  const templatePath = path.join(__dirname, 'templates', `${name}.html`);
  let html = fs.readFileSync(templatePath, 'utf-8');

  for (const key in data) {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key] || '');
  }
  return html;
}

// Luo CV (HTML + CSS pohjalla)
app.post('/create-cv', upload.single('photo'), async (req, res) => {
  try {
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
      template, // käyttäjän valitsema teema
    } = req.body;

    const photoPath = req.file ? req.file.path : null;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });
    }

    // konvertoi taustakuva base64:ksi
    const bgPath = path.join(__dirname, 'pohjat', 'cvpohja.jpg');
    let bgBase64 = '';
    if (fs.existsSync(bgPath)) {
      const bgData = fs.readFileSync(bgPath);
      bgBase64 = `data:image/jpeg;base64,${bgData.toString('base64')}`;
    }

    // konvertoi kuva base64:ksi
    let photoHtml = '';
    if (photoPath) {
      const photoData = fs.readFileSync(photoPath);
      const photoBase64 = `data:image/${path
        .extname(photoPath)
        .slice(1)};base64,${photoData.toString('base64')}`;
      photoHtml = `<img src="${photoBase64}" style="max-width:120px;border-radius:50%;" />`;
    }

    // täyttödata templateen
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
      photo: photoHtml,
      bgImage: bgBase64,
    });

    // Luo PDF
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

// käynnistä serveri
app.listen(4000, () => console.log('API running at http://localhost:4000'));
