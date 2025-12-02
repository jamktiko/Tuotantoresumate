<script>
  import './+page.css';
  import { goto } from '$app/navigation';

  let sahkoposti = '';
  let salasana = '';

  const kirjaudu = () => {
    goto('/paasivu');
  };
</script>

<div class="login-page">
  <div class="container">
    <!-- Left: Login Form -->
    <div class="left-side">
      <h1>Kirjaudu sisään</h1>

      <form on:submit|preventDefault={kirjaudu}>
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
