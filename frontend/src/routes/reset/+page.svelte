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

<div class="container">
  <!-- Vasemman puolen lomake -->
  <div class="left-side">
    <h1>Unohtuiko salasana?</h1>

    <form on:submit|preventDefault={lahetaReset} class="space-y-4">
      <input
        type="email"
        placeholder="Sähköpostiosoite"
        bind:value={sahkoposti}
        class="w-full border rounded-full px-4 py-2"
      />

      {#if viesti}
        <p class="text-sm text-green-600">{viesti}</p>
      {/if}

      <button
        type="submit"
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Lähetä palautuslinkki
      </button>
    </form>

    <p class="login-text">
      Muistitko salasanan? <a href="../" class="text-blue-600"
        >Kirjaudu sisään</a
      >
    </p>
  </div>

  <!-- Oikean puolen kuva -->
  <div class="right-side">
    <img src="../src/lib/assets/forgot.svg" alt="Forgot password icon" />
  </div>
</div>

<div class="background-shapes">
  <div class="circle"></div>
  <div class="triangle"></div>
</div>
