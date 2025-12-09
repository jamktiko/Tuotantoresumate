<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import './+page.css';
  import { fetchCVs, logoutUser, openCV, editCV, createNewCV } from './api.js';
  import CVCard from './CVCard.svelte';
  import { decodeToken } from '$lib/auth/decodeToken.js';

  if (!localStorage.getItem('idToken')) {
    goto('/');
  }

  let user = { name: '', email: '' };
  let cvs = [];

  // Hae token
  const idToken = localStorage.getItem('idToken');

  // Purkaa token ja hae email
  if (idToken) {
    const decoded = decodeToken(idToken);

    user.email = decoded.email;

    user.name = user.email.split('@')[0]; // väliaikainen nimi
  }

  onMount(async () => {
    try {
      cvs = await fetchCVs();
    } catch (err) {
      console.error('CV:n haku epäonnistui:', err);
    }
  });

  async function logout() {
    // Poista Cogniton tokenit
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Ohjaa kirjautumissivulle
    window.location.href = '/';
  }
</script>

<div class="profile-page">
  <header class="profile-header">
    <h1>Resumate – Profiili</h1>
    <button class="logout-btn" on:click={logout}>Kirjaudu ulos</button>
  </header>

  <div class="profile-content">
    <div class="profile-info">
      <div class="avatar">{user.name.charAt(0)}</div>
      <div class="profile-text">
        <h2 class="username">{user.name}</h2>
        <p class="email">{user.email}</p>
      </div>
    </div>

    <hr class="section-divider" />

    <h2>Omat CV:t</h2>

    <div class="profile-cv-gallery">
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

      {#each cvs as cv}
        <CVCard {cv} onOpen={openCV} onEdit={editCV} />
      {/each}
    </div>
  </div>
</div>
