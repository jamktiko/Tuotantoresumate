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
  let showExtra = false;
  import { slide } from 'svelte/transition';
  async function createCV() {
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

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    const res = await fetch('http://localhost:4000/create-cv', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.pdfPath) {
      cvUrl = `http://localhost:4000${data.pdfPath}`;
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
  }

  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      photoFile = file;
      photoPreview = URL.createObjectURL(file);
    }
  }
</script>

<header>
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
        <button type="submit">Luo CV</button>
      </form>

      {#if cvUrl}
        <a href={cvUrl} target="_blank">📄 Lataa CV</a>
      {/if}
    </main>
  </div>

  <div class="right"></div>
</div>

<style>
  .page {
    display: flex;
    min-height: 100vh; /* ei height: 100vh jos on padding-top */
    width: 100%;
    padding-top: 70px; /* headerin korkeus */
    box-sizing: border-box; /* jotta padding ei lisää korkeutta */
    overflow-y: auto; /* scrolli vain tarvittaessa */
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

  header {
    width: 100%;
    height: 70px;
    background-color: #1e1e1e;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center; /* h1 keskelle */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-sizing: border-box;
  }

  header h1 {
    margin: 0;
    font-family: 'Sansita Swashed', sans-serif;
    font-size: 42px;
    font-weight: 200;
    position: relative; /* keskitetty */
    z-index: 1;
  }

  header .fill-btn {
    position: absolute; /* irti flex-kontekstista */
    right: 20px;
    top: 50%;
    height: 40px;
    width: 150px;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* vasemmalle */
    justify-content: flex-start;
    padding: 1rem; /* lähempänä vasenta reunaa */
    overflow-y: auto;
    background: transparent;
  }

  .right {
    flex: 1;
    background: transparent;
  }

  .cv-form {
    margin-top: 100px;
    margin-left: 75px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 800px;
    width: 120%;
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

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 25px;
    border-radius: 24px;
    font-family: 'afacad', sans-serif;
    background-color: #00adb5;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    transition:
      transform 0.5s ease,
      box-shadow 0.5s ease;
  }

  a:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 173, 181, 0.5);
  }
</style>
