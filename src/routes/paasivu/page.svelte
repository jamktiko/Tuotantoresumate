<script>
  let name = '';
  let email = '';
  let experience = '';
  let cvUrl = '';

  async function createCV() {
    const res = await fetch('http://localhost:4000/create-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, experience }),
    });

    const data = await res.json();
    if (data.pdfPath) {
      cvUrl = `http://localhost:4000${data.pdfPath}`;
    }
  }

  // --- Satunnaistäyttö ---
  function fillRandom() {
    const names = ['Matti Meikäläinen', 'Anna Virtanen', 'Kalle Korhonen'];
    const emails = ['matti@testi.fi', 'anna@example.com', 'kalle@domain.fi'];
    const experiences = [
      '5 vuotta ohjelmistokehitystä JavaScriptillä.',
      'Projektinhallintaa ja tiiminvetämistä IT-alalla.',
      'Frontend- ja backend-kehitystä modernilla stackilla.',
    ];

    name = names[Math.floor(Math.random() * names.length)];
    email = emails[Math.floor(Math.random() * emails.length)];
    experience = experiences[Math.floor(Math.random() * experiences.length)];
  }
</script>

<!-- Nappi vasempaan yläkulmaan -->
<button class="fill-btn" on:click={fillRandom}>Täytä satunnaisilla</button>

<main>
  <h1>Resumate – Prototyyppi</h1>

  <form on:submit|preventDefault={createCV} class="cv-form">
    <input bind:value={name} placeholder="Nimi" />
    <input bind:value={email} placeholder="Sähköposti" />
    <textarea bind:value={experience} placeholder="Työkokemus"></textarea>
    <button type="submit">Luo CV</button>
  </form>

  {#if cvUrl}
    <a href={cvUrl} target="_blank">📄 Lataa CV</a>
  {/if}
</main>

<style>
  /* Satunnaistäyttönappi vasempaan yläkulmaan */
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
    background-color: #eeeeee; /* Tausta */
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  h1 {
    color: #393e46;
    margin-bottom: 25px;
    font-size: 2.5rem;
  }

  .cv-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    width: 100%;
    padding: 25px;
    border-radius: 15px;
    background-color: #393e46; /* Kortin väri */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .cv-form input,
  .cv-form textarea {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #eeeeee;
    background-color: #555759;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .cv-form input:focus,
  .cv-form textarea:focus {
    transform: scale(1.02);
    box-shadow: 0 0 10px #00adb5;
    outline: none;
  }

  .cv-form button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 10px;
    background-color: #00adb5; /* Nappula */
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
    background-color: #00adb5; /* Latauslinkki nappula */
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
