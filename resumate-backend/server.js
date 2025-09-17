const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/pdfs', express.static('pdfs'));
app.use('/uploads', express.static('uploads')); // palvellaan kuvat ulos

// varmistetaan että kansiot on olemassa
if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// multer konfiguraatio kuville
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Luo CV (tekstit + kuva)
app.post('/create-cv', upload.single('photo'), (req, res) => {
  const { title, firstName, lastName, email, phone, postalCode, city } =
    req.body;
  const photoPath = req.file ? req.file.path : null;

  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ error: 'Etunimi, sukunimi ja sähköposti vaaditaan!' });
  }

  const fileName = `cv_${Date.now()}.pdf`;
  const filePath = `pdfs/${fileName}`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  // Otsikko
  doc.fontSize(20).text('Resumate – CV', { align: 'center' });
  doc.moveDown();

  // Jos kuva löytyy, lisätään PDF:ään
  if (photoPath) {
    try {
      doc.image(photoPath, {
        fit: [120, 120],
        align: 'center',
        valign: 'center',
      });
      doc.moveDown();
    } catch (err) {
      console.error('Kuvan lisäys epäonnistui:', err);
    }
  }

  // Tekstit
  doc.fontSize(14).text(`Työnimike: ${title || '-'}`);
  doc.text(`Nimi: ${firstName} ${lastName}`);
  doc.text(`Sähköposti: ${email}`);
  doc.text(`Puhelinnumero: ${phone || '-'}`);
  doc.text(`Postinumero: ${postalCode || '-'}`);
  doc.text(`Kaupunki: ${city || '-'}`);

  doc.end();

  res.json({ pdfPath: `/pdfs/${fileName}` });
});

// Käynnistä serveri
app.listen(4000, () => {
  console.log('API running at http://localhost:4000');
});
