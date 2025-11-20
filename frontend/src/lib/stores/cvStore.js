import { writable } from 'svelte/store';

export const cvData = writable({
  // personal
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  postalCode: '',
  city: '',
  birthdate: '',
  driverslicense: '',
  website: '',
  linkedin: '',
  references: [],

  // content
  summary: '',
  experiences: [
    {
      title: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  educations: [
    {
      degree: '',
      city: '',
      school: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  languages: [], // { language: 'Suomi', level: 3 }
  skills: [], // { nimi: '', opittu: '', taso: 'Aloittelija' }

  // extras
  extraWork: '',
  extraEducation: '',
  template: 'modern',

  // media
  photoFile: null,
  photoPreview: null,
});
