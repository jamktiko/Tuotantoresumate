<script>
  import './+page.css';
  import { goto } from '$app/navigation';
  let sahkoposti = '';
  let salasana = '';

  const kirjaudu = () => {
    goto('/paasivu');
  };
</script>

<div class="container">
  <!-- Vasemman puolen lomake -->
  <div class="left-side">
    <h1>Kirjaudu sisään</h1>

    <form on:submit|preventDefault={kirjaudu} class="space-y-4">
      <input
        type="email"
        placeholder="Sähköpostiosoite"
        bind:value={sahkoposti}
        class="w-full border rounded-full px-4 py-2"
      />

      <input
        type="password"
        placeholder="Salasana"
        bind:value={salasana}
        class="w-full border rounded-full px-4 py-2"
      />
      <div class="pwdreset">
        <div class="flex justify-end">
          <a href="./reset" class="text-sm text-blue-600 underline">
            Unohtuiko salasana?
          </a>
        </div>
      </div>

      <button
        type="button"
        on:click={kirjaudu}
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Kirjaudu
      </button>

      <p class="login-text">
        Ei vielä tiliä? <a href="./rekisteroidy" class="text-blue-600"
          >Luo tili</a
        >
      </p>
    </form>
  </div>

  <!-- Oikean puolen kuva -->
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
