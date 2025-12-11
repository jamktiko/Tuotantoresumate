<script>
  // Tuodaan sivun tyylit
  import './+page.css';

  // Navigointiin käytettävä SvelteKit-funktio
  import { goto } from '$app/navigation';

  // Cognito-kirjautumisen rekisteröintifunktio
  import { signUpUser } from '$lib/auth/cognitoClient.js';

  // Lomakkeen kenttien tilamuuttujat
  let name = '';
  let email = '';
  let password = '';
  let agree = false;

  // Virhe- ja onnistumisviestit
  let errorMessage = '';
  let successMessage = '';

  // Rekisteröintifunktio
  const register = async () => {
    errorMessage = '';
    successMessage = '';

    // Käyttöehtojen hyväksyntä tarkistus
    if (!agree) {
      errorMessage = 'Sinun tulee hyväksyä käyttöehdot.';
      return;
    }

    try {
      // Yritetään luoda käyttäjä Cognitoon
      await signUpUser(email, password);

      // Onnistumisviesti käyttäjälle
      successMessage =
        'Tili luotu! Tarkista sähköpostisi vahvistuskoodin saamiseksi.';

      // Ohjataan vahvistussivulle hetken viiveellä
      setTimeout(() => {
        goto(`/varmistus?email=${email}`);
      }, 1500);
    } catch (err) {
      // Mahdollinen virheilmoitus
      errorMessage = err.message || 'Rekisteröinti epäonnistui';
    }
  };
</script>

<div class="rekisteroidy-page">
  <div class="container">
    <div class="left-side">
      <h1>Luo tili</h1>

      <!-- Rekisteröintilomake -->
      <form on:submit|preventDefault={register}>
        {#if errorMessage}
          <p style="color:red; margin-bottom:10px;">{errorMessage}</p>
        {/if}

        {#if successMessage}
          <p style="color:green; margin-bottom:10px;">{successMessage}</p>
        {/if}

        <!-- Nimikenttä -->
        <div class="input-group">
          <label for="name">Nimi</label>
          <input
            id="name"
            type="text"
            placeholder="Nimi"
            bind:value={name}
            required
          />
        </div>

        <!-- Sähköpostikenttä -->
        <div class="input-group">
          <label for="email">Sähköpostiosoite</label>
          <input
            id="email"
            type="email"
            placeholder="esimerkki@posti.com"
            bind:value={email}
            required
          />
        </div>

        <!-- Salasanakenttä -->
        <div class="input-group">
          <label for="password">Salasana</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            bind:value={password}
            required
          />
        </div>

        <!-- Käyttöehtojen hyväksyntä -->
        <div class="checkbox-row">
          <input id="agree" type="checkbox" bind:checked={agree} />
          <label for="agree">
            Hyväksyn <a href="/terms">käyttöehdot</a>
          </label>
        </div>

        <!-- Rekisteröitymispainike -->
        <button type="submit">Rekisteröidy</button>

        <!-- Linkki kirjautumissivulle -->
        <p class="login-text">
          Onko sinulla jo tili? <a href="/">Kirjaudu sisään</a>
        </p>
      </form>
    </div>

    <!-- Oikean puolen kuva -->
    <div class="right-side">
      <img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Kuva" />
    </div>
  </div>

  <!-- Taustaelementit poistettu -->
</div>
