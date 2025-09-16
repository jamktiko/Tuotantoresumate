<script>
  let name = '';
  let email = '';
  let password = '';
  let agreed = false;

  const handleSubmit = () => {
    if (!agreed) {
      alert('Hyväksy ehdot ensin!');
      return;
    }
    console.log({ name, email, password });
  };
</script>

<div class="container">
  <!-- Vasen puoli: lomake -->
  <div class="left-side">
    <h1>Aloita nyt</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" placeholder="Nimi" bind:value={name} />
      <input type="email" placeholder="Sähköposti" bind:value={email} />
      <input type="password" placeholder="Salasana" bind:value={password} />

      <label class="checkbox-label">
        <input type="checkbox" bind:checked={agreed} />
        <span>Hyväksyn <a href="/terms">käyttöehdot</a></span>
      </label>

      <button type="submit">Rekisteröidy</button>
    </form>

    <p class="login-text">
      Onko sinulla jo tili? <a href="../">Kirjaudu sisään</a>
    </p>
  </div>

  <!-- Oikea puoli: kuva -->
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
    min-height: 100vh;
    justify-content: center; /* Vaakasuuntainen keskitys */
    margin-bottom: 1.5rem;
    width: 100%;
  }

  /* Vasen puoli - lomake */
  .left-side {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3rem;
    background-color: transparent;
    height: 100vh;
    box-sizing: border-box;
  }

  /* Oikea puoli - kuva */
  .right-side {
    width: 50%;
    height: 100vh;
    margin: 0; /* poistaa mahdollisen marginaalin */
    padding: 0; /* poistaa paddingin */
    overflow: hidden; /* estää kuvan ulkopuolelle menemisen */
  }

  .right-side img {
    display: block; /* estää inline-kuvan baseline-offsetin */
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
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
  }

  /* Lomake */
  .left-side form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    box-sizing: border-box;
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

  .checkbox-label {
    display: flex;
    align-items: center; /* Keskittää checkboxin ja tekstin pystysuunnassa */
    gap: 0.5rem; /* Etäisyys checkboxin ja tekstin välillä */
    margin-top: 0.5rem;
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
  }

  .checkbox-label input {
    margin: 0; /* Poistaa oletusmarginaalin */
    width: 15px; /* Mahdollistaa yhtenäisen koon */
    height: 15px; /* Mahdollistaa yhtenäisen koon */
    vertical-align: middle; /* Keskittää checkbox pystysuunnassa */
  }

  .checkbox-label span {
    display: inline-block;
  }
  .checkbox-label a {
    color: #007bff;
    text-decoration: underline;
    font-family: 'Afacad', sans-serif;
    font-size: 16px;
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
