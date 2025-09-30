<script>
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
      photoPreview = URL.createObjectURL(file);
    }
  }

  function addExperience() {
    experiences = [
      ...experiences,
      { title: '', company: '', city: '', start: '', end: '', description: '' },
    ];
  }

  // Poista tietty työkokemus
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

          <div class="photo-card">
            <div class="photo-upload">
              <!-- Placeholder/kuva vasemmalla -->
              <div class="photo-preview">
                {#if photoPreview}
                  <img src={photoPreview} alt="Profiilikuva" />
                {:else}
                  <div class="placeholder">Ei kuvaa</div>
                {/if}
              </div>

              <!-- Painike oikealla -->
              <label class="upload-btn">
                Lisää valokuva
                <input
                  type="file"
                  accept="image/*"
                  on:change={handlePhotoUpload}
                  hidden
                />
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
            <div class="language-entry">
              <!-- kieli dropdown -->
              <select bind:value={lang.language}>
                <option value="">Valitse kieli...</option>
                {#each availableLanguages as langOption}
                  <option value={langOption}>{langOption}</option>
                {/each}
              </select>

              <!-- taso slider -->
              <div class="level-control">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  bind:value={lang.level}
                />
                <span class="level-label">{levelLabels[lang.level]}</span>
              </div>

              <button
                type="button"
                class="remove"
                on:click={() => removeLanguage(i)}
              >
                Poista
              </button>
            </div>
          {/each}

          <button type="button" class="add" on:click={addLanguage}>
            Lisää kieli
          </button>
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

<style>
  .cv-form button.download {
    background-color: #00d1da; /* kirkkaampi sininen */
  }

  .page {
    display: flex;
    min-height: 100vh;
    height: 100vh; /* ei height: 100vh jos on padding-top */
    width: 100%;
    padding-top: 70px; /* headerin korkeus */
    box-sizing: border-box; /* jotta padding ei lisää korkeutta */
    overflow-y: auto;
  }
  .extra-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #000000;
    font-family: 'afacad', sans-serif;
    font-weight: 600;
    font-size: 18px;
    user-select: none;
    margin: 10px 0;
  }

  .extra-toggle:hover {
    color: #0056a3;
  }
  .extra-info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 10px;
  }

  .main-header {
    width: 100%;
    height: 70px;
    background-color: #1e1e1e;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .main-header h1 {
    margin: 0;
    font-family: 'Sansita Swashed', sans-serif;
    font-size: 42px;
    font-weight: 200;
  }

  .main-header .fill-btn {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1010;
  }

  header .fill-btn {
    position: absolute; /* irti flex-kontekstista */
    right: 20px;
    top: 50%;
    height: 40px;
    width: 150px;
    z-index: 1010;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
    padding: 10px 14px;
    border-radius: 24px;
    border: none;
    background: #00adb5;
    font-family: 'Afacad', sans-serif;
    color: #fff;
    font-size: 16px;
    font-weight: 200;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(11, 118, 239, 0.18);
  }

  .left {
    flex: 3;
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, #00acb51e, #eeeeee);
    align-items: center; /* vasemmalle */
    justify-content: flex-start;
    padding: 1rem; /* lähempänä vasenta reunaa */
    overflow-y: auto;
    background: transparent;
  }

  .right {
    flex: none;
    width: 650px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    overflow-y: auto;
  }

  .cv-form {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 800px;
    width: 100%;
    padding: 0;
    background-color: transparent;
  }

  .row {
    display: flex;
    gap: 12px;
    width: 100%;
  }

  .top-row {
    display: flex;
    align-items: flex-end; /* estää inputin venymisen kortin korkeuteen */
    gap: 12px;
  }
  .row,
  .top-row {
    display: flex;
    gap: 12px;
    width: 100%;
  }

  .top-row input {
    flex: 1;
    min-height: 40px;
    max-width: calc(50% - 6px); /* sama leveys kuin muilla riveillä */
  }

  .cv-form input {
    flex: 1; /* kaikki yhtä leveitä */
    min-height: 40px;
    padding: 0.5rem 1rem;
    border: 1px solid #393e46;
    border-radius: 24px;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
    background-color: transparent;
    box-sizing: border-box;
  }

  .photo-card {
    flex: none;
    min-width: calc(50% - 6px);
    width: 100;
    padding: 12px;
    border-radius: 16px;
    background-color: #00acb54b; /* kortin tausta */
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .photo-upload {
    display: flex;
    align-items: center;
    gap: 20px; /* tila napin ja kuvan välillä */
    margin-top: 10px;
  }

  .upload-btn {
    cursor: pointer;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 18px;
    text-decoration: underline;
    color: #0056a3;
    padding: 12px 20px;
    background-color: transparent;
    border-radius: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .photo-preview {
    width: 90px;
    height: 90px;
    border-radius: 12px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f0f0f0;
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    align-items: center;
  }

  .photo-preview .placeholder {
    color: #999;
    font-size: 14px;
    text-align: center;
    align-items: center;
  }

  .cv-form button {
    width: 100%;
    height: 45px;
    background-color: #00adb5;
    color: #fff;
    font-family: 'Afacad', sans-serif;
    font-size: 22px;
    font-weight: 700;
    border: none;
    border-radius: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .cv-form button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 173, 181, 0.5);
  }

  .right {
    flex: none;
    width: 650px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    background: transparent; /* kevyt tausta */
    overflow-y: auto;
  }

  .cv-a4 {
    background: #fff;
    width: 595px; /* A4 leveys */
    height: 842px; /* A4 korkeus */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;
  }
  .cv-header {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 20px;
  }

  .cv-header img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .cv-header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }

  .cv-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    color: #666;
  }

  .cv-section h3 {
    margin: 0 0 10px;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    color: #059dc0;
  }

  .cv-section p {
    margin: 4px 0;
    font-size: 14px;
    color: #333;
  }

  .template-switcher {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 10px;
  }

  .template-switcher button {
    padding: 6px 14px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    background: #444;
    color: #fff;
    transition: all 0.2s ease;
  }

  .template-switcher button:hover {
    background: #00adb5;
  }

  .template-switcher button.selected {
    background: #059dc0;
    color: #fff;
  }

  .section {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 18px;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    align-items: center;
    color: #000;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    align-items: center;
    color: #000;
    margin-bottom: 10px;
  }

  .experience-grid {
    border-radius: 6px;
    margin-bottom: 15px;
    background: transparent;
    display: flex;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
    flex-direction: column;
    gap: 10px;
  }

  .experience-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* ensimmäinen rivi: työnimike + kaupunki */
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  .experience-grid .company {
    grid-column: 1 / span 2; /* vie koko rivin */
  }

  .experience-grid .date {
    grid-column: span 1; /* molemmat vie puolet rivistä */
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
  }

  .input.full {
    width: 100%;
  }

  textarea.input {
    min-height: 60px;
  }

  button.add {
    background: #00adb5;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 24px;
    cursor: pointer;
    align-self: flex-start;
  }

  textarea.input {
    flex: 1;
    min-height: 60px;
    padding: 0.5rem 1rem;
    border: 1px solid #393e46;
    border-radius: 24px;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
    background-color: transparent;
    box-sizing: border-box;
    resize: vertical; /* sallii korkeuden muokkauksen */
  }
  .summary-label {
    font-family: 'Afacad', sans-serif; /* vaihda tähän haluamasi fontti */
    font-size: 16px; /* suurempi/pienempi fonttikoko */
    font-weight: 600; /* lihavointi */
    color: #333; /* tekstin väri */
    margin-bottom: 8px; /* vähän tilaa labelin alle */
    display: block; /* pitää labelin omalla rivillä */
  }

  /* Poista-nappi */
  button.remove {
    background: #db5b5b;
    width: 100%;
    text-align: center;
    color: white;
    border: none;
    padding: 8px 14px; /* sama kuin add */
    border-radius: 24px;
    cursor: pointer;
    align-self: flex-start; /* rivin alkuun */
    width: auto; /* ei veny automaattisesti */
    grid-column: 1 / -1; /* vie koko rivin */
    justify-self: stretch; /* vasemmalle */
  }

  .experience-grid textarea.input {
    grid-column: 1 / -1; /* vie koko rivin */
    min-height: 120px;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 24px;
    border: 1px solid #393e46;
    box-sizing: border-box;
    resize: vertical;
  }

  .education-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* tutkinto + kaupunki vierekkäin */
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  /* Oppilaitos vie koko rivin */
  .education-grid .company {
    grid-column: 1 / span 2;
  }

  /* Päivämäärät puoliksi rinnakkain */
  .education-grid .date {
    grid-column: span 1;
  }

  /* Kuvaus koko rivin leveydeltä */
  .education-grid textarea.input {
    grid-column: 1 / -1;
    min-height: 120px;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 24px;
    border: 1px solid #393e46;
    box-sizing: border-box;
    resize: vertical;
  }

  /* Poista-nappi koko rivin leveydeltä */
  .education-grid button.remove {
    grid-column: 1 / -1;
  }

  #languages-section {
    margin: 20px 0;
  }

  .language-entry {
    display: flex;
    align-items: flex-start;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
    gap: 12px;
    margin-bottom: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background-color: transparent;
  }

  /* dropdown */
  .language-entry select {
    flex: 1;
    height: 40px; /* sama korkeus kuin muut */
    width: 160px;
    min-width: 0px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid #393e46;
    background-color: transparent;
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #000;
    display: flex;
    align-items: center;
  }

  /* slider + label wrapper */
  .level-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 200px; /* sliderin leveys */
  }

  /* slider itse */
  .level-control input[type='range'] {
    width: 100%;
    margin: 0;
    padding: 0;
    accent-color: #00adb5;
  }

  /* poista-nappi */
  .language-entry button.remove {
    flex: none;
    height: 40px; /* sama korkeus kuin muut */
    padding: 0 16px;
    border-radius: 12px;
    background-color: #db5b5b;
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
