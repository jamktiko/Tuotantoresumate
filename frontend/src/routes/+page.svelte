<script>
  let sahkoposti = '';
  let salasana = '';

  const kirjaudu = () => {
    console.log('Kirjautuminen:', { sahkoposti, salasana });
  };
</script>

<div class="container">
  <!-- Vasemman puolen lomake -->
  <div class="left-side">
    <h1>Kirjaudu sisään</h1>

    <form on:submit|preventDefault={kirjaudu} class="space-y-4">
      <input
        type="email"
        placeholder="Sähköpostiosoite"
        bind:value={sahkoposti}
        class="w-full border rounded-full px-4 py-2"
      />

      <input
        type="password"
        placeholder="Salasana"
        bind:value={salasana}
        class="w-full border rounded-full px-4 py-2"
      />
      <div class="pwdreset">
        <div class="flex justify-end">
          <a href="/unohtunut-salasana" class="text-sm text-blue-600 underline">
            Unohtuiko salasana?
          </a>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Kirjaudu
      </button>
    </form>

    <p class="login-text">
      Ei vielä tiliä? <a href="./rekisteroidy" class="text-blue-600">Luo tili</a
      >
    </p>
  </div>

  <!-- Oikean puolen kuva -->
  <div class="right-side">
    <img
      src="../src/lib/assets/kirjautumiskuva.jpg"
      alt="Signup illustration"
    />
  </div>
</div>

<style>
  /* Pääkontti */
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    justify-content: center; /* Vaakasuuntainen keskitys */
    margin-bottom: 0;
    width: 100%;
  }
  .pwdreset {
    font-family: 'Afacad', sans-serif;
    align-items: center;
  }

  /* Vasen puoli - lomake */
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
    border-top-left-radius: 48px;
    border-bottom-left-radius: 48px;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.25);
  }
  .right-side::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #00acb51e, transparent); /* teal sävy */
  }

  .right-side img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; /* poistaa ylimääräisen "inline spacingin" */
    border-top-left-radius: 48px;
    border-bottom-left-radius: 48px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Otsikko */
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

  /* Lomake */
  .left-side form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    top: -35px;
  }

  /* Inputit */
  .left-side input {
    width: 100%;
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

  /* Placeholder */
  .left-side input::placeholder {
    font-family: 'Afacad', sans-serif;
    font-weight: 100;
    font-size: 16px;
    color: #515151;
  }

  /* Painike */
  .left-side button {
    width: 100%;
    height: 40px;
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
  }

  /* Kirjaudu sisään teksti */
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
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
  }

  /* Responsiivisuus */
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
