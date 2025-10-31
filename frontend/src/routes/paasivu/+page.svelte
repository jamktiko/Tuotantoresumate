<script>
  import './+page.css';
  import { tick } from 'svelte';
  let previewFrame;
  let showDropdown = false;

  let title = '';
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let postalCode = '';
  let city = '';
  let birthdate = '';
  let driverslicense = '';
  let website = '';
  let linkedin = '';
  let photoPreview = null;
  let photoFile = null;
  let cvUrl = '';
  let isLoading = false;
  let showExtra = false;
  let extraWork = '';
  let extraEducation = '';
  let template = 'modern';
  let showSummary = false;
  let summary = '';
  let experiences = [
    { title: '', company: '', city: '', start: '', end: '', description: '' },
  ];
  let educations = [
    {
      degree: '',
      city: '',
      school: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ];
  let languages = [];
  let photoLoaded = false;

  let skills = [];
  const skillLevels = [
    'Aloittelija',
    'Keskitaso',
    'Edistynyt',
    'Ammattilainen',
  ];

  async function updatePreview() {
    if (!previewFrame) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('postalCode', postalCode);
    formData.append('city', city);
    formData.append('birthdate', birthdate);
    formData.append('driverslicense', driverslicense);
    formData.append('website', website);
    formData.append('linkedin', linkedin);
    formData.append('summary', summary);
    formData.append('experiences', JSON.stringify(experiences));
    formData.append('educations', JSON.stringify(educations));
    formData.append('languages', JSON.stringify(languages));
    formData.append('skills', JSON.stringify(skills));
    formData.append('extraWork', extraWork);
    formData.append('extraEducation', extraEducation);
    formData.append('template', template);

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      const res = await fetch('http://localhost:4000/preview-cv', {
        method: 'POST',
        body: formData,
      });
      const html = await res.text();

      const doc = previewFrame.contentDocument;
      doc.open();
      doc.write(html);
      doc.close();
    } catch (err) {
      console.error('Preview fetch failed', err);
    }
  }

  function addSkill() {
    skills = [...skills, { nimi: '', opittu: '', taso: 'Aloittelija' }];
  }

  function removeSkill(index) {
    skills = skills.filter((_, i) => i !== index);
  }

  function setTemplate(t) {
    template = t;
    updatePreview();
  }
  import { slide } from 'svelte/transition';
  async function createCV() {
    isLoading = true;
    await tick();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('postalCode', postalCode);
    formData.append('city', city);
    formData.append('birthdate', birthdate);
    formData.append('driverslicense', driverslicense);
    formData.append('website', website);
    formData.append('linkedin', linkedin);
    formData.append('summary', summary);
    formData.append('experiences', JSON.stringify(experiences));
    formData.append('educations', JSON.stringify(educations));
    formData.append('languages', JSON.stringify(languages));
    formData.append('skills', JSON.stringify(skills));
    formData.append('extraWork', extraWork);
    formData.append('extraEducation', extraEducation);

    if (photoFile) {
      formData.append('photo', photoFile);
    }
    formData.append('template', template);

    try {
      const res = await fetch('http://localhost:4000/create-cv', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.pdfPath) {
        cvUrl = `http://localhost:4000${data.pdfPath}`;
        window.open(cvUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  function fillRandom() {
    const titles = [
      'Ohjelmistokehittäjä',
      'Projektipäällikkö',
      'UX-suunnittelija',
    ];
    const firstNames = ['Matti', 'Anna', 'Kalle'];
    const lastNames = ['Meikäläinen', 'Virtanen', 'Korhonen'];
    const emails = ['matti@testi.fi', 'anna@example.com', 'kalle@domain.fi'];
    const phones = ['0401234567', '0507654321', '0459998888'];
    const postals = ['00100', '33100', '90500'];
    const cities = ['Helsinki', 'Tampere', 'Oulu'];
    const birthdates = ['01.01.1985', '12.06.1990', '23.09.1995'];
    const drivers = ['B', 'B/C', 'A/B'];
    const websites = ['www.example.com', 'www.mysite.fi', 'www.testpage.net'];
    const linkedins = [
      'linkedin.com/in/matti',
      'linkedin.com/in/anna',
      'linkedin.com/in/kalle',
    ];
    const summaries = [
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    ];

    title = titles[Math.floor(Math.random() * titles.length)];
    firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    email = emails[Math.floor(Math.random() * emails.length)];
    phone = phones[Math.floor(Math.random() * phones.length)];
    postalCode = postals[Math.floor(Math.random() * postals.length)];
    city = cities[Math.floor(Math.random() * cities.length)];
    birthdate = birthdates[Math.floor(Math.random() * birthdates.length)];
    driverslicense = drivers[Math.floor(Math.random() * drivers.length)];
    website = websites[Math.floor(Math.random() * websites.length)];
    linkedin = linkedins[Math.floor(Math.random() * linkedins.length)];
    summary = summaries[Math.floor(Math.random() * summaries.length)];

    const expTitles = [
      'Ohjelmoija',
      'Projektipäällikkö',
      'UI/UX-suunnittelija',
    ];
    const expCompanies = ['Firma Oy', 'Startup Inc', 'BigCompany Ltd'];
    const expCities = ['Helsinki', 'Tampere', 'Oulu'];
    const expDescriptions = [
      'Työskentelin front-end kehityksessä...',
      'Vastuullani oli projektinhallinta ja tiimin ohjaus...',
      'Suunnittelin käyttöliittymiä ja käyttäjäkokemusta...',
    ];

    const count = Math.floor(Math.random() * 3) + 1;
    experiences = [];
    for (let i = 0; i < count; i++) {
      experiences.push({
        title: expTitles[Math.floor(Math.random() * expTitles.length)],
        company: expCompanies[Math.floor(Math.random() * expCompanies.length)],
        city: expCities[Math.floor(Math.random() * expCities.length)],
        startDate: '2020-01-01',
        endDate: '2021-12-31',
        description:
          expDescriptions[Math.floor(Math.random() * expDescriptions.length)],
      });
    }
    const degrees = ['Tradenomi', 'Diplomi-insinööri', 'FM', 'AMK'];
    const schools = ['Helsingin yliopisto', 'Tampereen AMK', 'Oulun yliopisto'];
    const eduCities = ['Helsinki', 'Tampere', 'Oulu'];
    const eduDescriptions = [
      'Keskittyi tietojenkäsittelyyn ja ohjelmistokehitykseen.',
      'Opiskeli projektinhallintaa ja liiketaloutta.',
      'Erikoistui käyttöliittymien suunnitteluun ja UX:ään.',
    ];

    const eduCount = Math.floor(Math.random() * 3) + 1;
    educations = [];
    for (let i = 0; i < eduCount; i++) {
      educations.push({
        degree: degrees[Math.floor(Math.random() * degrees.length)],
        city: eduCities[Math.floor(Math.random() * eduCities.length)],
        school: schools[Math.floor(Math.random() * schools.length)],
        startDate: '2015-08-01',
        endDate: '2019-06-30',
        description:
          eduDescriptions[Math.floor(Math.random() * eduDescriptions.length)],
      });
      const allSkills = [
        'JavaScript',
        'Node.js',
        'React',
        'Python',
        'HTML & CSS',
        'SQL',
        'Photoshop',
        'UI/UX-suunnittelu',
        'Projektinhallinta',
        'Git & GitHub',
      ];
      const learnedFrom = ['Itseopittu', 'Koulu', 'Työkokemus', 'Kurssi'];
      const skillLevels = [
        'Aloittelija',
        'Keskitaso',
        'Edistynyt',
        'Ammattilainen',
      ];

      const skillCount = Math.floor(Math.random() * 4) + 1; // 1–4 taitoa
      skills = [];
      for (let i = 0; i < skillCount; i++) {
        const randomSkill =
          allSkills[Math.floor(Math.random() * allSkills.length)];
        const randomLearned =
          learnedFrom[Math.floor(Math.random() * learnedFrom.length)];
        const randomLevel =
          skillLevels[Math.floor(Math.random() * skillLevels.length)];
        skills.push({
          nimi: randomSkill,
          opittu: randomLearned,
          taso: randomLevel,
        });
      }
    }
    const allLanguages = [
      'Suomi',
      'Englanti',
      'Ruotsi',
      'Saksa',
      'Ranska',
      'Espanja',
      'Venäjä',
      'Kiina',
      'Japani',
    ];
    const langCount = Math.floor(Math.random() * 3) + 1; // 1–3 kieltä
    languages = [];
    for (let i = 0; i < langCount; i++) {
      const randomLang =
        allLanguages[Math.floor(Math.random() * allLanguages.length)];
      const randomLevel = Math.floor(Math.random() * 6); // taso 0–5
      languages.push({ language: randomLang, level: randomLevel });
    }
  }

  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      photoFile = file;
      photoLoaded = false;
      const url = URL.createObjectURL(file);
      photoPreview = url;
    }
  }

  function addExperience() {
    experiences = [
      ...experiences,
      { title: '', company: '', city: '', start: '', end: '', description: '' },
    ];
  }

  function removeExperience(index) {
    experiences = experiences.filter((_, i) => i !== index);
  }

  function addEducation() {
    educations = [
      ...educations,
      {
        degree: '',
        city: '',
        school: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ];
  }

  function removeEducation(index) {
    educations = educations.filter((_, i) => i !== index);
  }

  function addLanguage() {
    languages = [...languages, { language: '', level: 3 }];
  }

  function removeLanguage(index) {
    languages = languages.filter((_, i) => i !== index);
  }
  const availableLanguages = [
    'Suomi',
    'Englanti',
    'Ruotsi',
    'Saksa',
    'Ranska',
    'Espanja',
    'Venäjä',
    'Kiina',
    'Japani',
  ];

  const levelLabels = [
    'Aloittelija',
    'Perustaso',
    'Keskitaso',
    'Hyvä',
    'Erinomainen',
    'Natiivi',
  ];

  $: {
    title;
    firstName;
    lastName;
    email;
    phone;
    postalCode;
    city;
    birthdate;
    driverslicense;
    website;
    linkedin;
    summary;
    experiences;
    educations;
    languages;
    skills;
    extraWork;
    extraEducation;
    template;
    updatePreview();
  }
</script>

{#if isLoading}
  <div class="loader-overlay">
    <div class="spinner"></div>
  </div>
{/if}

<header class="main-header">
  <div class="left-controls">
    <div class="template-dropdown">
      <button
        class="dropdown-toggle"
        type="button"
        on:click={() => (showDropdown = !showDropdown)}
        aria-haspopup="true"
        aria-expanded={showDropdown}
      >
        {#if template === 'Playful'}Playful{/if}
        {#if template === 'modern'}Modern{/if}
        {#if template === 'Vintage'}Vintage{/if}
        ▾
      </button>

      {#if showDropdown}
        <ul class="dropdown-menu" role="menu">
          <li>
            <button
              type="button"
              class="dropdown-item"
              on:click={() => {
                setTemplate('Playful');
                showDropdown = false;
              }}
            >
              Playful
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dropdown-item"
              on:click={() => {
                setTemplate('modern');
                showDropdown = false;
              }}
            >
              Modern
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dropdown-item"
              on:click={() => {
                setTemplate('Vintage');
                showDropdown = false;
              }}
            >
              Vintage
            </button>
          </li>
        </ul>
      {/if}
    </div>
    <button
      class="cv-download-btn"
      on:click={createCV}
      title="Lataa CV (avaa uudessa välilehdessä)"
      aria-label="Lataa CV"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="cv-icon"
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      </svg>
      <span>Lataa CV</span>
    </button>
  </div>
  <h1>Resumate</h1>
  <button class="fill-btn" on:click={fillRandom}>Täyttö</button>
</header>

<div class="page">
  <div class="left">
    <main>
      <form on:submit|preventDefault={createCV} class="cv-form">
        <!-- Työnimike + kuva samalla rivillä -->
        <div class="row top-row">
          <input bind:value={title} placeholder="Työnimike" />
          <!-- korvaa vanha photo-card tällä -->
          <div class="photo-card">
            <div class="photo-preview">
              {#if photoPreview}
                <img
                  src={photoPreview}
                  alt="Profiilikuva"
                  on:load={() => (photoLoaded = true)}
                  class:loaded={photoLoaded}
                />
              {/if}

              <!-- overlay-nappi -->
              <label class="upload-overlay" title="Vaihda profiilikuva">
                <input
                  type="file"
                  accept="image/*"
                  on:change={handlePhotoUpload}
                  aria-label="Lataa profiilikuva"
                />
                <svg
                  class="camera-small"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path
                    d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                  />
                  <path
                    d="M20 5h-3.2l-1.2-1.6a1 1 0 0 0-.8-.4H9.2c-.3 0-.6.1-.8.4L7.2 5H4a2 2 0 0 0-2 2v12h20V7a2 2 0 0 0-2-2z"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>

        <!-- Muut input-fieldit alempana -->
        <div class="row">
          <input bind:value={firstName} placeholder="Etunimi" />
          <input bind:value={lastName} placeholder="Sukunimi" />
        </div>

        <div class="row">
          <input bind:value={email} type="email" placeholder="Sähköposti" />
          <input bind:value={phone} type="tel" placeholder="Puhelinnumero" />
        </div>

        <div class="row">
          <input bind:value={postalCode} placeholder="Postinumero" />
          <input bind:value={city} placeholder="Kaupunki" />
        </div>

        <div
          class="extra-toggle"
          role="button"
          tabindex="0"
          on:click={() => (showExtra = !showExtra)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              showExtra = !showExtra;
            }
          }}
        >
          {#if showExtra}▼ Piilota lisätiedot{:else}▶ Näytä lisätiedot{/if}
        </div>

        {#if showExtra}
          <div class="extra-info" in:slide out:slide>
            <div class="row">
              <input bind:value={birthdate} placeholder="Syntymäaika" />
              <input
                bind:value={driverslicense}
                placeholder="Ajokorttiluokat"
              />
            </div>
            <div class="row">
              <input bind:value={website} placeholder="Verkkosivusto" />
              <input bind:value={linkedin} placeholder="Linkedin" />
            </div>
          </div>
        {/if}

        <!-- Ammattiyhteenveto-toggle -->
        <div
          class="extra-toggle"
          role="button"
          tabindex="0"
          on:click={() => (showSummary = !showSummary)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              showSummary = !showSummary;
            }
          }}
        >
          {#if showSummary}▼ Piilota ammattiyhteenveto{:else}▶
            Ammattiyhteenveto{/if}
        </div>

        {#if showSummary}
          <div class="extra-info" in:slide out:slide>
            <label for="summary-input" class="summary-label">
              Korosta yleistä ammatillista kokemustasi, keskeisiä taitoja ja
              uratavoitteitasi.
            </label>
            <textarea
              id="summary-input"
              bind:value={summary}
              rows="4"
              class="input full"
              placeholder="..."
            ></textarea>
          </div>
        {/if}

        <hr class="section-divider" />

        <!-- UUSI TYÖKOKEMUS-OSIO -->
        <div class="section">
          <h2>Työkokemus</h2>

          {#each experiences as exp, i}
            <div class="experience-card">
              <div class="experience-grid">
                <input
                  type="text"
                  placeholder="Työnimike"
                  bind:value={exp.title}
                />
                <input
                  type="text"
                  placeholder="Kaupunki"
                  bind:value={exp.city}
                />
                <input
                  type="text"
                  placeholder="Yrityksen nimi"
                  bind:value={exp.company}
                  class="company"
                />
                <input
                  type="date"
                  placeholder="Aloituspäivämäärä"
                  bind:value={exp.startDate}
                  class="date"
                />
                <input
                  type="date"
                  placeholder="Loppupäivämäärä"
                  bind:value={exp.endDate}
                  class="date"
                />
                <textarea
                  class="input full"
                  placeholder="Kuvaus"
                  bind:value={exp.description}
                ></textarea>
                <button
                  type="button"
                  class="remove full-width"
                  on:click={() => removeExperience(i)}>Poista</button
                >
              </div>
            </div>
          {/each}

          <button type="button" class="add" on:click={addExperience}
            >+ Lisää työkokemus</button
          >
        </div>

        <hr class="section-divider" />
        <div class="section">
          <h2>Koulutus</h2>

          {#each educations as edu, i}
            <div class="education-card">
              <div class="education-grid">
                <input
                  type="text"
                  placeholder="Tutkinto"
                  bind:value={edu.degree}
                />
                <input
                  type="text"
                  placeholder="Kaupunki"
                  bind:value={edu.city}
                />
                <input
                  type="text"
                  placeholder="Oppilaitos"
                  bind:value={edu.school}
                  class="company"
                />
                <input
                  type="date"
                  placeholder="Aloituspäivämäärä"
                  bind:value={edu.startDate}
                  class="date"
                />
                <input
                  type="date"
                  placeholder="Valmistumispäivämäärä"
                  bind:value={edu.endDate}
                  class="date"
                />
                <textarea
                  class="input full"
                  placeholder="Kuvaus"
                  bind:value={edu.description}
                ></textarea>
                <button
                  type="button"
                  class="remove"
                  on:click={() => removeEducation(i)}>Poista koulutus</button
                >
              </div>
            </div>
          {/each}

          <button type="button" class="add" on:click={addEducation}
            >Lisää koulutus</button
          >
        </div>

        <hr class="section-divider" />
        <div id="languages-section">
          <h3>Kielitaidot</h3>

          {#each languages as lang, i}
            <div class="language-entry" in:slide out:slide>
              <div class="custom-select-wrapper">
                <select bind:value={lang.language} class="custom-select">
                  <option value="">Valitse kieli...</option>
                  {#each availableLanguages as langOption}
                    <option value={langOption}>{langOption}</option>
                  {/each}
                </select>
              </div>

              <div class="custom-select-wrapper">
                <select bind:value={lang.level} class="custom-select">
                  {#each [0, 1, 2, 3, 4, 5] as n}
                    <option value={n}>{levelLabels[n]}</option>
                  {/each}
                </select>
              </div>

              <button
                type="button"
                class="remove"
                on:click={() => removeLanguage(i)}>✕</button
              >
            </div>
          {/each}

          <button type="button" class="add" on:click={addLanguage}
            >Lisää kieli</button
          >
        </div>

        <hr class="section-divider" />
        <div class="section" id="skills-section">
          <h2>Taidot</h2>

          {#each skills as skill, i}
            <div class="skill-entry" in:slide out:slide>
              <div class="custom-select-wrapper">
                <input
                  type="text"
                  placeholder="Taidon nimi"
                  bind:value={skill.nimi}
                  class="skill-input"
                />
              </div>
              <div class="custom-select-wrapper">
                <input
                  type="text"
                  placeholder="Missä opittu"
                  bind:value={skill.opittu}
                  class="skill-input"
                />
              </div>
              <div class="custom-select-wrapper">
                <select bind:value={skill.taso} class="custom-select">
                  {#each skillLevels as level}
                    <option value={level}>{level}</option>
                  {/each}
                </select>
              </div>
              <button
                type="button"
                class="remove"
                on:click={() => removeSkill(i)}>✕</button
              >
            </div>
          {/each}

          <button type="button" class="add" on:click={addSkill}
            >Lisää taito</button
          >
        </div>
        <hr class="section-divider" />
        <h2>Kerro lisää</h2>
        <section class="extra-section">
          <div class="extra-two">
            <div>
              <label for="extraWork">Työhön liittyviä lisätietoja</label>
              <textarea id="extraWork" rows="4" bind:value={extraWork}
              ></textarea>
            </div>
            <div>
              <label for="extraEducation"
                >Työn kannalta oleellisia opintoihin tai osaamiseen liittyviä
                lisätietoja</label
              >
              <textarea id="extraEducation" rows="4" bind:value={extraEducation}
              ></textarea>
            </div>
          </div>
        </section>
      </form>
    </main>
  </div>
  <div class="right">
    <iframe bind:this={previewFrame} class="preview-frame" title="CV Preview"
    ></iframe>
  </div>
</div>
