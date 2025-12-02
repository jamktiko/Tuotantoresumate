<script>
  import { onMount } from 'svelte';
  import './+page.css';
  import { fetchCVs, logoutUser, openCV, editCV, createNewCV } from './api.js';
  import CVCard from './CVCard.svelte';

  let user = { name: 'Testikäyttäjä', email: 'testi@example.com' };
  let cvs = [];

  onMount(async () => {
    try {
      cvs = await fetchCVs();
    } catch (err) {
      console.error('CV:n haku epäonnistui:', err);
    }
  });

  async function logout() {
    await logoutUser();
    window.location.href = '/login';
  }
</script>

<div class="profile-page">
  <header class="main-header">
    <h1>Resumate – Profiili</h1>
    <button class="logout-btn" on:click={logout}>Kirjaudu ulos</button>
  </header>

  <div class="page">
    <div class="profile-info">
      <div class="avatar">{user.name.charAt(0)}</div>
      <div class="profile-text">
        <h2 class="username">{user.name}</h2>
        <p class="email">{user.email}</p>
      </div>
    </div>

    <hr class="section-divider" />

    <h2>Omat CV:t</h2>

    <div class="cv-gallery">
      <button class="cv-template new-cv" type="button" on:click={createNewCV}>
        <div class="cv-thumb empty">
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
