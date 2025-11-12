import { get } from 'svelte/store';
import { cvData } from '$lib/stores/cvStore';
import { pools } from './randomData.js';
import { skillLevels, availableLanguages } from './constants.js';

function buildFormData(data) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) {
    if (k === 'photoPreview') continue; // preview URL, not needed by server
    if (k === 'photoFile' && v) fd.append('photo', v);
    else if (Array.isArray(v) || typeof v === 'object')
      fd.append(k, JSON.stringify(v ?? ''));
    else fd.append(k, v ?? '');
  }
  return fd;
}

export async function updatePreview(previewFrame) {
  if (!previewFrame) return;
  const data = get(cvData);
  const res = await fetch('http://localhost:4000/preview-cv', {
    method: 'POST',
    body: buildFormData(data),
  });
  const html = await res.text();
  const doc = previewFrame.contentDocument;
  doc.open();
  doc.write(html);
  doc.close();
}

export async function createCV(openAfter = true) {
  const res = await fetch('http://localhost:4000/create-cv', {
    method: 'POST',
    body: buildFormData(get(cvData)),
  });
  const json = await res.json();
  if (openAfter && json.pdfPath) {
    const url = `http://localhost:4000${json.pdfPath}`;
    window.open(url, '_blank');
    return url;
  }
  return null;
}

// basic throttle to avoid spamming the server on every keystroke
export function throttle(fn, wait = 300) {
  let last = 0,
    timer;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn(...args);
      }, wait);
    }
  };
}

export function handlePhotoFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  cvData.update((d) => ({ ...d, photoFile: file, photoPreview: url }));
}

// Täyttö button
export function fillRandom() {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  cvData.update((d) => {
    d.title = pick(pools.titles);
    d.firstName = pick(pools.firstNames);
    d.lastName = pick(pools.lastNames);
    d.email = pick(pools.emails);
    d.phone = pick(pools.phones);
    d.postalCode = pick(pools.postals);
    d.city = pick(pools.cities);
    d.birthdate = pick(pools.birthdates);
    d.driverslicense = pick(pools.drivers);
    d.website = pick(pools.websites);
    d.linkedin = pick(pools.linkedins);
    d.summary = pick(pools.summaries);

    const expCount = Math.floor(Math.random() * 3) + 1;
    d.experiences = Array.from({ length: expCount }, () => ({
      title: pick(pools.expTitles),
      company: pick(pools.expCompanies),
      city: pick(pools.expCities),
      startDate: '2020-01-01',
      endDate: '2021-12-31',
      description: pick(pools.expDescriptions),
    }));

    const eduCount = Math.floor(Math.random() * 3) + 1;
    d.educations = Array.from({ length: eduCount }, () => ({
      degree: pick(pools.degrees),
      city: pick(pools.eduCities),
      school: pick(pools.schools),
      startDate: '2015-08-01',
      endDate: '2019-06-30',
      description: pick(pools.eduDescriptions),
    }));

    const skillCount = Math.floor(Math.random() * 4) + 1;
    d.skills = Array.from({ length: skillCount }, () => ({
      nimi: pick(pools.allSkills),
      opittu: pick(pools.learnedFrom),
      taso: pick(skillLevels),
    }));

    const allLangs = [...availableLanguages];
    const langCount = Math.floor(Math.random() * 3) + 1;
    d.languages = Array.from({ length: langCount }, () => ({
      language: pick(allLangs),
      level: Math.floor(Math.random() * 6),
    }));
    return d;
  });
}
