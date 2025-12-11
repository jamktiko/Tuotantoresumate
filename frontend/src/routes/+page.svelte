<script>
  // Tuodaan tyylitiedosto tälle sivulle
  import './+page.css';

  // SveltKitin navigointifunktio sivun vaihtamiseen
  import { goto } from '$app/navigation';

  // Cognito-kirjautumisfunktio omasta kirjasto-osiosta
  import { loginUser } from '$lib/auth/cognitoClient.js';

  // Lomakkeen kenttien tiedot
  let sahkoposti = '';
  let salasana = '';
  let errorMessage = '';

  // Kirjautumisfunktio
  const kirjaudu = async () => {
    errorMessage = '';

    try {
      // Yritetään kirjautua Cogniton kautta
      const tokens = await loginUser(sahkoposti, salasana);

      // Tallennetaan Cogniton palauttamat tokenit selaimen localStorageen
      localStorage.setItem('idToken', tokens.idToken);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      // Navigoidaan pääsivulle onnistuneen kirjautumisen jälkeen
      goto('/paasivu');
    } catch (err) {
      // Tulostetaan virhe konsoliin debuggausta varten
      console.log('Cognito login error:', err);

      // Näytetään käyttäjälle virheilmoitus
      errorMessage = err.message || 'Kirjautuminen epäonnistui';
    }
  };
</script>

<div class="login-page">
  <div class="container">
    <!-- Vasen puoli: Kirjautumislomake -->
    <div class="left-side">
      <h1>Kirjaudu sisään</h1>

      <!-- Lomake, joka ei lähetä tietoja oletus-POSTilla -->
      <form on:submit|preventDefault={kirjaudu}>
        {#if errorMessage}
          <!-- Virheilmoitus käyttäjälle -->
          <p style="color:red; margin-bottom:10px;">{errorMessage}</p>
        {/if}

        <div class="input-group">
          <label for="email">Sähköpostiosoite</label>
          <input
            id="email"
            type="email"
            placeholder="esimerkki@posti.com"
            bind:value={sahkoposti}
          />
        </div>

        <div class="input-group">
          <label for="password">Salasana</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            bind:value={salasana}
          />
        </div>

        <div class="pwdreset">
          <!-- Linkki salasanan resetointiin -->
          <a href="/reset">Unohtuiko salasana?</a>
        </div>

        <!-- Kirjautumispainike -->
        <button type="submit">Kirjaudu</button>

        <p class="login-text">
          Ei vielä tiliä?
          <!-- Linkki rekisteröitymissivulle -->
          <a href="/rekisteroidy">Luo tili</a>
        </p>
      </form>
    </div>

    <!-- Oikea puoli: kuva -->
    <div class="right-side">
      <img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Kirjautumiskuva" />
    </div>
  </div>
</div>
