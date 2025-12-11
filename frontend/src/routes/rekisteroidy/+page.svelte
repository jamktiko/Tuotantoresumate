<script>
  import './+page.css';
  import { goto } from '$app/navigation';
  import { signUpUser } from '$lib/auth/cognitoClient.js';

  let name = '';
  let email = '';
  let password = '';
  let agree = false;

  let errorMessage = '';
  let successMessage = '';

  const register = async () => {
    errorMessage = '';
    successMessage = '';

    if (!agree) {
      errorMessage = 'Sinun tulee hyväksyä käyttöehdot.';
      return;
    }

    try {
      await signUpUser(email, password);

      successMessage =
        'Tili luotu! Tarkista sähköpostisi vahvistuskoodin saamiseksi.';

      // ohjataan confirm-sivulle 2 sekunnin jälkeen
      setTimeout(() => {
        goto(`/varmistus?email=${email}`);
      }, 1500);
    } catch (err) {
      errorMessage = err.message || 'Rekisteröinti epäonnistui';
    }
  };
</script>

<div class="rekisteroidy-page">
  <div class="container">
    <div class="left-side">
      <h1>Luo tili</h1>

      <form on:submit|preventDefault={register}>
        {#if errorMessage}
          <p style="color:red; margin-bottom:10px;">{errorMessage}</p>
        {/if}

        {#if successMessage}
          <p style="color:green; margin-bottom:10px;">{successMessage}</p>
        {/if}

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
