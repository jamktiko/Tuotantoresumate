<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { confirmUser } from '$lib/auth/cognitoClient.js';

  let code = '';
  let errorMessage = '';
  let successMessage = '';

  // otetaan email query-parametristä: /confirm?email=test@example.com
  let email;
  $: email = $page.url.searchParams.get('email');

  const confirm = async () => {
    errorMessage = '';
    successMessage = '';

    if (!email) {
      errorMessage = 'Sähköpostiosoite puuttuu URL:sta.';
      return;
    }

    try {
      await confirmUser(email, code);

      successMessage = 'Tilin vahvistus onnistui! Voit nyt kirjautua sisään.';

      // ohjaa login-sivulle 1.5 sek jälkeen
      setTimeout(() => {
        goto('/');
      }, 1500);
    } catch (err) {
      errorMessage = err.message || 'Vahvistus epäonnistui';
    }
  };
</script>

<div class="confirm-page">
  <h1>Vahvista sähköpostisi</h1>
  <p>Syötä sähköpostiisi lähetetty 6-numeroinen vahvistuskoodi.</p>

  {#if errorMessage}
    <p style="color:red; margin-bottom:10px;">{errorMessage}</p>
  {/if}

  {#if successMessage}
    <p style="color:green; margin-bottom:10px;">{successMessage}</p>
  {/if}

  <form on:submit|preventDefault={confirm}>
    <input
      type="text"
      placeholder="Vahvistuskoodi"
      bind:value={code}
      minlength="6"
      maxlength="6"
      required
    />

    <button type="submit">Vahvista tili</button>
  </form>

  <p>Sähköposti: {email}</p>
</div>

<style>
  .confirm-page {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
  }

  button {
    width: 100%;
    padding: 10px;
    background: teal;
    color: white;
    border-radius: 5px;
  }
</style>
