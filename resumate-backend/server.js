const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();
app.use(cors()); // sallii frontin kutsut
app.use(bodyParser.json());
app.use('/pdfs', express.static('pdfs')); // kansio PDF-tiedostoille

// Luo yksinkertainen API CV:n tekemiseen
app.post('/create-cv', (req, res) => {
  const { name, email, experience } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan!' });
  }

  // Luo PDF-tiedosto
  if (!fs.existsSync('pdfs')) fs.mkdirSync('pdfs');
  const fileName = `cv_${Date.now()}.pdf`;
  const filePath = `pdfs/${fileName}`;

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text('Resumate – CV', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Nimi: ${name}`);
  doc.text(`Sähköposti: ${email}`);
  doc.moveDown();
  doc.fontSize(12).text('Työkokemus:');
  doc.text(experience || '-');
  doc.end();

  res.json({ pdfPath: `/pdfs/${fileName}` });
});

// Käynnistä serveri
app.listen(4000, () => {
  console.log('API running at http://localhost:4000');
});
