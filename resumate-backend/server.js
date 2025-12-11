// Tuodaan tarvittavat kirjastot
const express = require('express'); // Web-palvelin
const fs = require('fs'); // Tiedostojen käsittely
const path = require('path'); // Polkujen käsittely
const puppeteer = require('puppeteer'); // PDF:n generointi HTML:stä
const multer = require('multer'); // Tiedostojen upload
const cors = require('cors'); // CORS-tuki

// Luodaan Express-sovellus
const app = express();

// Middlewaret
app.use(cors()); // Sallitaan CORS
app.use(express.json()); // JSON-pyyntöjen käsittely
app.use('/pdfs', express.static('pdfs')); // Staattiset PDF-tiedostot
app.use('/uploads', express.static('uploads')); // Staattiset uploadit

// Luodaan kansiot jos niitä ei ole
['pdfs', 'uploads', 'templates'].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Multer-konfiguraatio kuvien latausta varten
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/', // kansio tallennukselle
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)), // tiedostonimi timestamp + alkuperäinen pääte
  }),
});

// Kielitasojen ja taitotason labelit
const levelLabels = [
  'Aloittelija',
  'Perustaso',
  'Keskitaso',
  'Hyvä',
  'Erinomainen',
  'Natiivi',
];
const skillLabels = ['Aloittelija', 'Keskitaso', 'Edistynyt', 'Ammattilainen'];

// Funktiot tason muuntamiseen tekstiksi
const levelToText = (l) => levelLabels[l] || '';
const skillLevelToText = (l) =>
  !isNaN(l) ? skillLabels[+l] : skillLabels.includes(l) ? l : '';

// JSON-parsinta turvallisesti
const parseJSON = (str) => {
  try {
    return JSON.parse(str || '[]');
  } catch {
    return [];
  }
};

// HTML-templaten lataus ja datan renderöinti
function loadTemplate(name, data, isPreview = false) {
  const tplName = name || 'default';
  let html = fs.readFileSync(
    path.join(__dirname, 'templates', `${tplName}.html`),
    'utf-8'
  );

  // Funktio listojen renderöintiin
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

  // Korvataan template placeholderit datalla
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
          (s) =>
            `<li><strong>${s.nimi || ''}</strong> ${
              s.opittu ? `– ${s.opittu}` : ''
            } ${s.taso ? `(${skillLevelToText(s.taso)})` : ''}</li>`
        )
        .join('')
    )
    .replace(
      '{{languages}}',
      (data.languages || [])
        .map(
          (l) => `
<li>
  <strong>${l.language || ''}</strong>
  ${l.level !== undefined ? `(${levelLabels[l.level]})` : ''}  
</li>`
        )
        .join('')
    )
    .replace(
      '{{references}}',
      (data.references || [])
        .map(
          (r) => `
<li>
  <strong>${r.name || ''}</strong> – ${r.title || ''}<br>
  ${r.company || ''}<br>
  ${r.relation ? `<em>${r.relation}</em><br>` : ''}
  ${r.phone ? `Puh: ${r.phone}<br>` : ''}
  ${r.email ? `Email: ${r.email}<br>` : ''}
</li>`
        )
        .join('')
    )
    .replace(
      '{{extraInfo}}',
      `${
        data.extraEducation
          ? `<h3>Koulutuksen lisätiedot</h3><p>${data.extraEducation}</p><hr>`
          : ''
      }
       ${
         data.extraWork
           ? `<h3>Työhön liittyvät lisätiedot</h3><p>${data.extraWork}</p>`
           : ''
       }`
    );

  // Muut datan kentät
  for (const [k, v] of Object.entries(data)) {
    if (
      ![
        'experiences',
        'educations',
        'skills',
        'languages',
        'references',
      ].includes(k)
    ) {
      if (!v) {
        html = html.replace(new RegExp(`<p>\\s*{{${k}}}\\s*</p>`, 'g'), '');
        html = html.replace(new RegExp(`{{${k}}}`, 'g'), '');
      } else {
        html = html.replace(new RegExp(`{{${k}}}`, 'g'), v);
      }
    }
  }

  // Esikatseluun liittyvät tyylit ja skriptit
  if (isPreview) {
    const previewInjection = `
<style>
  :root { --preview-bg: #f0f0f0; --preview-text: #1b1d1f; }
  :root.dark { --preview-bg: #0f1113; --preview-text: #f1f5f9; }
  html, body { margin:0; padding:0; background: var(--preview-bg); color: var(--preview-text); width:100%; height:100%; overflow:hidden; font-family:'Afacad', sans-serif; }
  .preview-root { width:100%; height:100%; overflow-y:auto; overflow-x:hidden; display:flex; justify-content:center; align-items:flex-start; padding:20px 0; box-sizing:border-box; }
  .scale-box { transform-origin: top center; display:inline-block; }
  .scale-box .a4-page { width:210mm; margin:0; background:white; box-shadow:0 0 12px rgba(0,0,0,0.25); }
</style>
<script>
  function scalePreview() {
    const box = document.querySelector('.scale-box');
    const page = document.querySelector('.scale-box .a4-page');
    if (!box || !page) return;
    const A4_WIDTH_PX = 210 * 3.78;
    const available = window.innerWidth - 40;
    const scale = Math.min(available / A4_WIDTH_PX, 1);
    box.style.transform = 'scale(' + scale + ')';
    box.style.height = (page.offsetHeight * scale) + 'px';
  }
  window.addEventListener('resize', scalePreview);
  window.addEventListener('load', function () {
    const imgs = Array.from(document.images || []);
    if (!imgs.length) return scalePreview();
    let loaded = 0;
    imgs.forEach(img => {
      if (img.complete) { if (++loaded >= imgs.length) scalePreview(); }
      else { img.addEventListener('load', () => { if (++loaded >= imgs.length) scalePreview(); });
             img.addEventListener('error', () => { if (++loaded >= imgs.length) scalePreview(); });
      }
    });
  });
</script>
`;
    html = html.replace('</head>', previewInjection + '</head>');
    html = html.replace(
      /<body([^>]*)>/i,
      "<body$1><div class='preview-root'><div class='scale-box'>"
    );
    html = html.replace(/<\/body>/i, '</div></div></body>');
    return html;
  }

  // PDF-tyylit
  const pdfInjection = `
<style>
  @page { size:A4; margin:0; }
  html, body { margin:0; padding:0; }
  .a4-page { width:210mm; margin:0 auto; box-sizing:border-box; height:auto; min-height:auto; page-break-inside:auto; }
  header, footer, section, .section, div, p, h1, h2, h3, h4 { page-break-inside:avoid; }
</style>
`;
  html = html.replace('</head>', pdfInjection + '</head>');
  return html;
}

// Funktio pyynnön datan käsittelyyn
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
  parsed.references = parseJSON(req.body.references);
  return parsed;
}

// API endpoint PDF:n luomiselle
app.post('/create-cv', upload.single('photo'), async (req, res) => {
  try {
    const data = extractData(req);
    const photo = req.file
      ? `<img src="data:image/png;base64,${fs
          .readFileSync(req.file.path)
          .toString('base64')}" style="max-width:120px;border-radius:50%;" />`
      : '';

    ['language1', 'language2', 'language3'].forEach((key, i) => {
      const lang = data.languages[i];
      data[key] = lang ? `${lang.language} (${levelToText(lang.level)})` : '';
    });

    const html = loadTemplate(data.template, { ...data, photo }, false);

    const fileName = `cv_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, 'pdfs', fileName);

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    });
    await browser.close();

    res.json({ pdfPath: `/pdfs/${fileName}` });
  } catch (err) {
    console.error('CV ERROR:', err);
    res.status(500).json({ error: 'Virhe CV:n luonnissa' });
  }
});

// API endpoint esikatselulle
app.post('/preview-cv', upload.single('photo'), async (req, res) => {
  try {
    const data = extractData(req);
    const photoHtml = req.file
      ? `<img src="data:image/png;base64,${fs
          .readFileSync(req.file.path)
          .toString('base64')}" class="profile-photo" />`
      : '';

    const html = loadTemplate(
      data.template,
      { ...data, photo: photoHtml },
      true
    );
    res.send(html);
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).json({ error: 'Virhe esikatselussa' });
  }
});

// Palvelin kuuntelee porttia 4000
app.listen(4000, () => console.log('API running on http://localhost:4000'));
