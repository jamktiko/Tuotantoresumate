<script>
  // SvelteKitin navigointifunktio
  import { goto } from '$app/navigation';

  // Suoritetaan koodi komponentin mountin jälkeen
  import { onMount } from 'svelte';

  // Tyylit tälle sivulle
  import './+page.css';

  // API-funktiot: CV-listaus, uloskirjautuminen, CV:n avaaminen, muokkaus, luonti
  import { fetchCVs, logoutUser, openCV, editCV, createNewCV } from './api.js';

  // Yksittäisen CV:n korttikomponentti
  import CVCard from './CVCard.svelte';

  // JWT-tokenin purku emailin lukemiseksi
  import { decodeToken } from '$lib/auth/decodeToken.js';

  // Jos ei ole kirjautumistokenia → ohjaa etusivulle (kirjautumiseen)
  if (!localStorage.getItem('idToken')) {
    goto('/');
  }

  // Käyttäjäobjekti (nimi + email)
  let user = { name: '', email: '' };

  // Käyttäjän kaikkien CV:iden lista
  let cvs = [];

  // Haetaan token localStoragesta
  const idToken = localStorage.getItem('idToken');

  // Jos token on olemassa, pura se ja hae käyttäjän email
  if (idToken) {
    const decoded = decodeToken(idToken);

    user.email = decoded.email;

    // Luodaan väliaikainen nimi emailin alkuosasta
    user.name = user.email.split('@')[0];
  }

  // Kun komponentti latautuu → hae CV:t backendistä
  onMount(async () => {
    try {
      cvs = await fetchCVs();
    } catch (err) {
      console.error('CV:n haku epäonnistui:', err);
    }
  });

  // Uloskirjautuminen
  async function logout() {
    // Poistetaan Cogniton tokenit selaimesta
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Ohjataan kirjautumissivulle
    window.location.href = '/';
  }
</script>

<div class="profile-page">
  <header class="profile-header">
    <h1>Resumate – Profiili</h1>
    <!-- Uloskirjautumispainike -->
    <button class="logout-btn" on:click={logout}>Kirjaudu ulos</button>
  </header>

  <div class="profile-content">
    <!-- Käyttäjän perustiedot -->
    <div class="profile-info">
      <div class="avatar">{user.name.charAt(0)}</div>
      <div class="profile-text">
        <h2 class="username">{user.name}</h2>
        <p class="email">{user.email}</p>
      </div>
    </div>

    <hr class="section-divider" />

    <h2>Omat CV:t</h2>

    <!-- CV-galleria -->
    <div class="profile-cv-gallery">
      <!-- Uuden CV:n luontipainike -->
      <button
        class="profile-cv-template new-cv"
        type="button"
        on:click={createNewCV}
      >
        <div class="profile-cv-thumb empty">
          <div class="plus-icon">＋</div>
        </div>
        <p>Uusi CV</p>
      </button>

      <!-- Listaa kaikki CV:t CVCard-komponentilla -->
      {#each cvs as cv}
        <CVCard {cv} onOpen={openCV} onEdit={editCV} />
      {/each}
    </div>
  </div>
</div>
