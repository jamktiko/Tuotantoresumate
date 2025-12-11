<script>
  import './+page.css';
  import { goto } from '$app/navigation';
  import { loginUser } from '$lib/auth/cognitoClient.js';

  let sahkoposti = '';
  let salasana = '';
  let errorMessage = '';

  const kirjaudu = async () => {
    errorMessage = '';

    try {
      const tokens = await loginUser(sahkoposti, salasana);

      // Tallenna tokenit selaimeen
      localStorage.setItem('idToken', tokens.idToken);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);

      goto('/paasivu');
    } catch (err) {
      console.log('Cognito login error:', err);
      errorMessage = err.message || 'Kirjautuminen epäonnistui';
    }
  };
</script>

<div class="login-page">
  <div class="container">
    <!-- Left: Login Form -->
    <div class="left-side">
      <h1>Kirjaudu sisään</h1>

      <form on:submit|preventDefault={kirjaudu}>
        {#if errorMessage}
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
          <a href="/reset">Unohtuiko salasana?</a>
        </div>

        <button type="submit">Kirjaudu</button>

        <p class="login-text">
          Ei vielä tiliä?
          <a href="/rekisteroidy">Luo tili</a>
        </p>
      </form>
    </div>

    <!-- Right Image -->
    <div class="right-side">
      <img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Kirjautumiskuva" />
    </div>
  </div>
</div>
