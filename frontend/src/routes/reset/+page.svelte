<script>
  // Tuodaan sivun tyylit
  import './+page.css';

  // Lomakkeen kentät
  let sahkoposti = ''; // Käyttäjän syöttämä sähköposti
  let viesti = ''; // Palautteeksi näytettävä viesti

  // Funktio palautuslinkin lähettämiseen
  const lahetaReset = async () => {
    viesti = ''; // Tyhjennetään viesti aina ennen lähettämistä

    try {
      // Lähetetään POST-pyyntö backendille
      const res = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sahkoposti }), // Lähetetään sähköposti
      });

      const data = await res.json();

      if (res.ok) {
        // Onnistumisviesti käyttäjälle
        viesti = 'Palautuslinkki on lähetetty sähköpostiisi (demo).';
      } else {
        // Virheilmoitus backendin mukaan tai oletusviesti
        viesti = data.error || 'Virhe lähetyksessä';
      }
    } catch (err) {
      // Jos palvelimeen ei saada yhteyttä
      viesti = 'Palvelimeen ei saatu yhteyttä.';
    }
  };
</script>

<div class="reset-page">
  <div class="container">
    <!-- Vasen puoli: lomake -->
    <div class="left-side">
      <h1>Unohtuiko salasana?</h1>

      <!-- Palautuslinkin lomake -->
      <form on:submit|preventDefault={lahetaReset}>
        <div class="input-group">
          <label for="email">Sähköpostiosoite</label>
          <input
            id="email"
            type="email"
            autocomplete="email"
            required
            bind:value={sahkoposti}
            placeholder="esimerkki@posti.com"
          />
        </div>

        <!-- Näytä viesti vain jos sitä on -->
        {#if viesti}
          <p class="feedback" role="status">{viesti}</p>
        {/if}

        <!-- Lähetä-painike -->
        <button type="submit">Lähetä palautuslinkki</button>
      </form>

      <!-- Linkki kirjautumissivulle -->
      <p class="login-text">
        Muistitko salasanan?
        <a href="/">Kirjaudu sisään</a>
      </p>
    </div>

    <!-- Oikea puoli: kuva -->
    <div class="right-side">
      <img src="../src/lib/assets/forgot.svg" alt="Salasanan palautuskuva" />
    </div>
  </div>
</div>
