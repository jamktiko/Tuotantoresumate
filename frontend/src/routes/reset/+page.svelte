<script>
  import './+page.css';
  let sahkoposti = '';
  let viesti = '';

  const lahetaReset = async () => {
    viesti = '';
    try {
      const res = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sahkoposti }),
      });

      const data = await res.json();
      if (res.ok) {
        viesti = 'Palautuslinkki on lähetetty sähköpostiisi (demo).';
      } else {
        viesti = data.error || 'Virhe lähetyksessä';
      }
    } catch (err) {
      viesti = 'Palvelimeen ei saatu yhteyttä.';
    }
  };
</script>

<div class="container">
  <!-- Vasemman puolen lomake -->
  <div class="left-side">
    <h1>Unohtuiko salasana?</h1>

    <form on:submit|preventDefault={lahetaReset} class="space-y-4">
      <input
        type="email"
        placeholder="Sähköpostiosoite"
        bind:value={sahkoposti}
        class="w-full border rounded-full px-4 py-2"
      />

      {#if viesti}
        <p class="text-sm text-green-600">{viesti}</p>
      {/if}

      <button
        type="submit"
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Lähetä palautuslinkki
      </button>
    </form>

    <p class="login-text">
      Muistitko salasanan? <a href="../" class="text-blue-600"
        >Kirjaudu sisään</a
      >
    </p>
  </div>

  <!-- Oikean puolen kuva -->
  <div class="right-side">
    <img src="../src/lib/assets/forgot.svg" alt="Forgot password icon" />
  </div>
</div>

<div class="background-shapes">
  <div class="circle"></div>
  <div class="triangle"></div>
</div>

<style>
  /* Sama tyyli kuin etusivulla */
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }

  .left-side {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3rem;
    background-color: transparent;
    height: 100vh;
    box-sizing: border-box;
  }

  .right-side {
    width: 45%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
  .right-side::after {
    content: '';
    position: absolute;
    inset: 0;
  }
  .right-side img {
    width: 100%; /* Kuva täyttää divin leveyden */
    max-height: 80%; /* Kuva ei kasva yli 80% divin korkeudesta */
    object-fit: contain; /* Säilyttää kuvasuhteen */
    display: block;
    margin: 0 auto; /* Keskittää kuvan vaakasuunnassa */
    transform: translateY(70px); /* Siirtää kuvaa 20px alaspäin */
  }

  .left-side h1 {
    font-family: 'Afacad', sans-serif;
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 2rem;
    color: #000;
    text-align: center;
    width: 100%;
    position: relative;
    top: -35px;
  }

  .left-side form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    top: -35px;
  }

  .left-side input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #393e46;
    border-radius: 24px;
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
    color: #000;
    background-color: transparent;
  }

  .left-side input::placeholder {
    color: #515151;
  }

  .left-side button {
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
    margin-left: 10px; /* Siirtää nappia hieman oikealle */
  }

  .login-text {
    margin-top: 1.5rem;
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
    text-align: center;
    position: relative;
    top: -35px;
  }

  .login-text a {
    color: #007bff;
    text-decoration: underline;
  }

  .background-shapes {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }

  .circle {
    position: absolute;
    top: -80px;
    left: -80px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: #e0e0e0;
  }
  .triangle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background: #757d8a;
    clip-path: polygon(0 100%, 100% 100%, 0 0);
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    .left-side,
    .right-side {
      width: 100%;
      height: 50vh;
    }
    .left-side {
      padding: 2rem;
    }
  }
</style>
