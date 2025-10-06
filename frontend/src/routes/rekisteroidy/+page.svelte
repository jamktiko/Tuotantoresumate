<script>
  import './+page.css';
  let name = '';
  let email = '';
  let password = '';
  let agreed = false;

  const handleSubmit = () => {
    if (!agreed) {
      alert('Hyväksy ehdot ensin!');
      return;
    }
    console.log({ name, email, password });
  };
</script>

<div class="container">
  <!-- Vasen puoli: lomake -->
  <div class="left-side">
    <h1>Aloita nyt</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" placeholder="Nimi" bind:value={name} />
      <input type="email" placeholder="Sähköposti" bind:value={email} />
      <input type="password" placeholder="Salasana" bind:value={password} />

      <label class="checkbox-label">
        <input type="checkbox" bind:checked={agreed} />
        <span>Hyväksyn <a href="/terms">käyttöehdot</a></span>
      </label>

      <button type="submit">Rekisteröidy</button>
    </form>

    <p class="login-text">
      Onko sinulla jo tili? <a href="../">Kirjaudu sisään</a>
    </p>
  </div>

  <!-- Oikea puoli: kuva -->
  <div class="right-side">
    <img
      src="../src/lib/assets/kirjautumiskuva.jpg"
      alt="Signup illustration"
    />
  </div>
</div>
<div class="background-shapes">
  <div class="circle"></div>
  <div class="triangle"></div>
</div>
