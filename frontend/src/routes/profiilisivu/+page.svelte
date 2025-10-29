<script>
  import { onMount } from 'svelte';

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

<style>
  .page {
    height: 100vh; /* näkyvän alueen korkeus */
    overflow: hidden; /* sisäistä vieritystä ei sallita */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* profiili vasemmalle */
  }
  p {
    margin-left: 50px;
    font-family: 'Afacad', sans-serif;
  }
  h2 {
    margin-left: 50px;
    font-family: 'Afacad', sans-serif;
  }
  .main-header {
    width: 100%;
    height: 70px;
    background-color: #1e1e1e;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .main-header h1 {
    margin: 0;
    font-family: 'Sansita Swashed', sans-serif;
    font-size: 42px;
    font-weight: 200;
  }

  .logout-btn {
    background-color: #ff4d4d;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;
    margin-right: 50px;
    font-family: 'Afacad', sans-serif;
    font-size: 18px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1010;
  }

  .logout-btn:hover {
    background-color: #e60000;
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 8rem 0 3rem 50px;
  }
  .avatar {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* pitää rivit samassa kohdassa vasemmalta */
    justify-content: center;
  }

  .username {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e1e1e;
    margin: 0; /* ei ylimääräisiä välejä */
  }

  .email {
    font-size: 1.1rem;
    color: #444;
    margin: 0; /* varmistetaan, että sähköposti on heti nimen alla */
    margin-top: 0.2rem; /* pieni väli nimen ja sähköpostin väliin */
  }

  .section-divider {
    width: 100vw;
    border: none;
    border-top: 2px solid #aaa;
    margin: 2rem 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .cv-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .cv-template button.cv-thumb,
  .cv-template.new-cv {
    all: unset;
    display: block;
    width: 150px;
    text-align: center;
    cursor: pointer;
  }

  .cv-thumb {
    margin-left: 50px;
    width: 100%;
    aspect-ratio: 3 / 4;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .cv-thumb:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .cv-thumb.empty {
    border: 2px dashed #007bff;
    background-color: #e7f3ff;
  }

  .plus-icon {
    font-size: 2rem;
    color: #007bff;
    font-weight: bold;
  }

  .cv-template p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }

  .cv-actions {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }

  .cv-actions button,
  .cv-actions a {
    background-color: #007bff;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .cv-actions button:hover,
  .cv-actions a:hover {
    background-color: #0056b3;
  }
</style>
