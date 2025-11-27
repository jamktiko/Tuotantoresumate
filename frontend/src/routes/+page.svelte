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
        <!-- Email -->
        <input
          type="email"
          placeholder="Sähköpostiosoite"
          bind:value={sahkoposti}
        />

        <!-- Password -->
        <input type="password" placeholder="Salasana" bind:value={salasana} />

        <!-- Forgot password -->
        <div class="pwdreset">
          <a href="/reset">Unohtuiko salasana?</a>
        </div>

        <!-- Login Button -->
        <button type="submit">Kirjaudu</button>

        <!-- Register Link -->
        <p class="login-text">
          Ei vielä tiliä?
          <a href="/rekisteroidy">Luo tili</a>
        </p>
      </form>
    </div>

    <!-- Right: Illustration -->
    <div class="right-side">
      <img src="../src/lib/assets/kirjautumiskuva.jpg" alt="Kirjautumiskuva" />
    </div>
  </div>
</div>
