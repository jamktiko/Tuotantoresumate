<script>
  import './+page.css';
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
  let photoPreview = null; // esikatselu
  let photoFile = null; // varsinainen tiedosto
  let cvUrl = '';
  let isLoading = false;
  let showExtra = false;
  let template = 'default'; // aktiivinen template
  let showSummary = false; // 👈 uusi toggle ammattiyhteenvedolle
  let summary = ''; // 👈 syötekenttää varten
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

  function setTemplate(t) {
    template = t;
  }
  import { slide } from 'svelte/transition';
  async function createCV() {
    isLoading = true;
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
      isLoading = false; // piilota spinner
    }
  }

  function fillRandom() {
    // Henkilötiedot
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

    // Työkokemukset
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

    // Luodaan 1-3 satunnaista työkokemusta
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

  // Poista koulutus
  function removeEducation(index) {
    educations = educations.filter((_, i) => i !== index);
  }

  function addLanguage() {
    languages = [...languages, { language: '', level: 3 }]; // oletus keskellä
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
</script>

<header class="main-header">
  <h1>Resumate</h1>
  <div class="template-switcher">
    <button
      on:click={() => setTemplate('default')}
      class:selected={template === 'default'}
    >
      Default
    </button>
    <button
      on:click={() => setTemplate('modern')}
      class:selected={template === 'modern'}
    >
      Modern
    </button>
    <button
      on:click={() => setTemplate('minimalist')}
      class:selected={template === 'minimalist'}
    >
      Minimalist
    </button>
  </div>
  <button class="fill-btn" on:click={fillRandom}>Täyttö</button>
</header>

{#if isLoading}
  <div class="loader-overlay">
    <div class="spinner"></div>
  </div>
{/if}

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

        <!-- Ammattiyhteenveto tähän -->

        <!-- UUSI TYÖKOKEMUS-OSIO -->
        <div class="section">
          <h2>Työkokemus</h2>

          {#each experiences as exp, i}
            <div class="experience-grid">
              <input
                type="text"
                placeholder="Työnimike"
                bind:value={exp.title}
                class="input"
              />
              <input
                type="text"
                placeholder="Kaupunki"
                bind:value={exp.city}
                class="input"
              />

              <input
                type="text"
                placeholder="Yrityksen nimi"
                bind:value={exp.company}
                class="input company"
              />

              <input
                type="date"
                placeholder="Aloituspäivämäärä"
                bind:value={exp.startDate}
                class="input date"
              />
              <input
                type="date"
                placeholder="Loppupäivämäärä"
                bind:value={exp.endDate}
                class="input date"
              />

              <!-- Kuvaus koko rivin levyisenä -->
              <textarea
                class="input full"
                placeholder="Kuvaus"
                bind:value={exp.description}
              ></textarea>

              <!-- Poista-nappi rivin levyisenä -->
              <button
                type="button"
                class="remove full-width"
                on:click={() => removeExperience(i)}
              >
                Poista
              </button>
            </div>
          {/each}

          <button type="button" class="add" on:click={addExperience}
            >+ Lisää työkokemus</button
          >
        </div>

        <h3>Koulutus</h3>

        {#each educations as edu, i}
          <div class="education-grid" in:slide out:slide>
            <input
              type="text"
              placeholder="Tutkinto"
              bind:value={edu.degree}
              class="input"
            />
            <input
              type="text"
              placeholder="Kaupunki"
              bind:value={edu.city}
              class="input"
            />
            <input
              type="text"
              placeholder="Oppilaitos"
              bind:value={edu.school}
              class="input company"
            />

            <input
              type="date"
              placeholder="Aloituspäivämäärä"
              bind:value={edu.startDate}
              class="input date"
            />
            <input
              type="date"
              placeholder="Valmistumispäivämäärä"
              bind:value={edu.endDate}
              class="input date"
            />

            <textarea
              class="input full"
              placeholder="Kuvaus"
              bind:value={edu.description}
            ></textarea>

            <!-- käytetään samaa remove-luokkaa kuin työkokemuksessa -->
            <button
              type="button"
              class="remove"
              on:click={() => removeEducation(i)}
            >
              Poista koulutus
            </button>
          </div>
        {/each}

        <!-- käytetään samaa add-luokkaa kuin työkokemuksessa -->
        <button type="button" class="add" on:click={addEducation}>
          Lisää koulutus
        </button>

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

        <button type="submit" class:download={cvUrl}>
          {#if cvUrl}
            📄 Lataa valmis CV
          {:else}
            Luo CV
          {/if}
        </button>
      </form>
    </main>
  </div>

  <div class="right">
    <div class="cv-a4">
      <header class="cv-header">
        {#if photoPreview}
          <img src={photoPreview} alt="Profiilikuva" />
        {/if}
        <div>
          <h1>{firstName} {lastName}</h1>
          <h2>{title}</h2>
        </div>
      </header>

      <section class="cv-section">
        <h3>Yhteystiedot</h3>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{postalCode} {city}</p>
      </section>

      {#if showExtra}
        <section class="cv-section">
          <h3>Lisätiedot</h3>
          <p>{birthdate}</p>
          <p>{driverslicense}</p>
          <p>{website}</p>
          <p>{linkedin}</p>
        </section>
      {/if}
    </div>
  </div>
</div>
