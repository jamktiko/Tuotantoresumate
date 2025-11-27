<script>
  import './+page.css';
  let sahkoposti = '';
  let viesti = '';

  const lahetaReset = async () => {
    viesti = '';
    try {
      const res = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sahkoposti }),
      });

      const data = await res.json();
      if (res.ok) {
        viesti = 'Palautuslinkki on lähetetty sähköpostiisi (demo).';
      } else {
        viesti = data.error || 'Virhe lähetyksessä';
      }
    } catch (err) {
      viesti = 'Palvelimeen ei saatu yhteyttä.';
    }
  };
</script>

<div class="reset-page">
  <div class="container">
    <div class="left-side">
      <h1>Unohtuiko salasana?</h1>

      <form on:submit|preventDefault={lahetaReset} class="space-y-4">
        <input
          type="email"
          placeholder="Sähköpostiosoite"
          bind:value={sahkoposti}
        />

        {#if viesti}
          <p class="text-sm text-green-600">{viesti}</p>
        {/if}

        <button type="submit">Lähetä palautuslinkki</button>
      </form>

      <p class="login-text">
        Muistitko salasanan?
        <a href="/">Kirjaudu sisään</a>
      </p>
    </div>

    <div class="right-side">
      <img src="../src/lib/assets/forgot.svg" alt="Forgot password icon" />
    </div>
  </div>
</div>
