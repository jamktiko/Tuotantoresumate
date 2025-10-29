<script>
  import { onMount } from 'svelte';
  import './+page.css';
  let user = { name: 'Testikäyttäjä', email: 'testi@example.com' };
  let cvs = [];

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:4000/my-cvs', {
        credentials: 'include',
      });
      const data = await res.json();
      cvs = data || [];
    } catch (err) {
      console.error('CV:n haku epäonnistui:', err);
    }
  });

  function logout() {
    fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  }

  function openCV(cv) {
    window.open(`http://localhost:4000${cv.pdfPath}`, '_blank');
  }

  function editCV(cv) {
    localStorage.setItem('editCV', JSON.stringify(cv));
    window.location.href = '/';
  }

  function createNewCV() {
    localStorage.removeItem('editCV');
    window.location.href = '/paasivu';
  }
</script>

<header class="main-header">
  <h1>Resumate – Profiili</h1>
  <button class="logout-btn" on:click={logout}>Kirjaudu ulos</button>
</header>

<div class="page">
  <div class="left">
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
      <button class="cv-template new-cv" on:click={createNewCV}>
        <div class="cv-thumb empty">
          <div class="plus-icon">＋</div>
        </div>
        <p>Uusi CV</p>
      </button>

      {#each cvs as cv}
        <div class="cv-template">
          <button class="cv-thumb" on:click={() => openCV(cv)}>
            <h4>{cv.title}</h4>
          </button>
          <p>{new Date(cv.createdAt).toLocaleDateString('fi-FI')}</p>
          <div class="cv-actions">
            <button on:click={() => editCV(cv)}>Muokkaa</button>
            <a href={`http://localhost:4000${cv.pdfPath}`} download>⬇️</a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
