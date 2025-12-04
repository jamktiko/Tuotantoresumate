<script>
  import './+page.css';

  let name = '';
  let email = '';
  let password = '';
  let agree = false;

  const register = () => {
    console.log('Registering...');
  };
</script>

<div class="rekisteroidy-page">
  <div class="container">
    <div class="left-side">
      <h1>Luo tili</h1>

      <form on:submit|preventDefault={register}>
        <input type="text" placeholder="Nimi" bind:value={name} />
        <input type="email" placeholder="Sähköpostiosoite" bind:value={email} />
        <input type="password" placeholder="Salasana" bind:value={password} />

        <div class="checkbox-row">
          <input id="agree" type="checkbox" bind:checked={agree} />
          <label for="agree">
            Hyväksyn <a href="/terms">käyttöehdot</a>
          </label>
        </div>

        <button type="submit">Rekisteröidy</button>

        <p class="login-text">
          Onko sinulla jo tili? <a href="/">Kirjaudu sisään</a>
        </p>
      </form>
    </div>

    <div class="right-side">
      <img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Kuva" />
    </div>
  </div>

  <!-- Background shapes removed -->
</div>
