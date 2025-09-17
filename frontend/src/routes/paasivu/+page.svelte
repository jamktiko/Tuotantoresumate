<script>
  let title = '';
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let postalCode = '';
  let city = '';
  let photoPreview = null; // esikatselu
  let photoFile = null; // varsinainen tiedosto
  let cvUrl = '';

  // --- PDF:n luonti ---
  async function createCV() {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('postalCode', postalCode);
    formData.append('city', city);
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

  // --- Satunnaistäyttö ---
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

    title = titles[Math.floor(Math.random() * titles.length)];
    firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    email = emails[Math.floor(Math.random() * emails.length)];
    phone = phones[Math.floor(Math.random() * phones.length)];
    postalCode = postals[Math.floor(Math.random() * postals.length)];
    city = cities[Math.floor(Math.random() * cities.length)];
  }

  // --- Kuvan valinta ---
  function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
      photoFile = file; // talletetaan tiedosto backendille
      photoPreview = URL.createObjectURL(file); // näytetään esikatselu
    }
  }
</script>

<!-- Satunnaistäyttönappi -->
<button class="fill-btn" on:click={fillRandom}>Täytä satunnaisilla</button>

<main>
  <h1>Resumate – Prototyyppi</h1>

  <form on:submit|preventDefault={createCV} class="cv-form">
    <input bind:value={title} placeholder="Työnimike" />

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

    <!-- Kuvan lataus -->
    <label class="upload-btn">
      📷 Lisää valokuva
      <input
        type="file"
        accept="image/*"
        on:change={handlePhotoUpload}
        hidden
      />
    </label>
    {#if photoPreview}
      <img src={photoPreview} alt="Profiilikuva" class="preview" />
    {/if}

    <button type="submit">Luo CV</button>
  </form>

  {#if cvUrl}
    <a href={cvUrl} target="_blank">📄 Lataa CV</a>
  {/if}
</main>

<style>
  .fill-btn {
    position: fixed;
    top: 12px;
    left: 12px;
    padding: 10px 14px;
    border-radius: 8px;
    border: none;
    background: #0b76ef;
    color: white;
    font-weight: 600;
    box-shadow: 0 6px 18px rgba(11, 118, 239, 0.18);
    cursor: pointer;
    z-index: 1000;
  }
  .fill-btn:active {
    transform: translateY(1px);
  }

  main {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }

  .cv-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px;
    width: 100%;
    padding: 25px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .row {
    display: flex;
    gap: 12px;
  }

  .cv-form input {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 15px;
  }

  .upload-btn {
    display: inline-block;
    padding: 10px 14px;
    background: #0b76ef;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    width: fit-content;
  }

  .preview {
    margin-top: 12px;
    max-width: 120px;
    border-radius: 8px;
  }

  .cv-form button {
    padding: 14px;
    border: none;
    border-radius: 10px;
    background-color: #00adb5;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  .cv-form button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 173, 181, 0.5);
  }

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 25px;
    border-radius: 10px;
    background-color: #00adb5;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  a:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 173, 181, 0.5);
  }
</style>
