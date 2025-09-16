<script>
  let sahkoposti = '';
  let salasana = '';

  const kirjaudu = () => {
    console.log('Kirjautuminen:', { sahkoposti, salasana });
  };
</script>

<div class="flex min-h-screen">
  <!-- Vasemman puolen lomake -->
  <div class="flex flex-col justify-center w-1/2 px-12 bg-gray-100">
    <h1 class="text-xl font-semibold mb-6">Kirjaudu sisään</h1>

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

      <div class="flex justify-end">
        <a href="/unohtunut-salasana" class="text-sm text-blue-600 underline">
          Unohtuiko salasana?
        </a>
      </div>

      <button
        type="submit"
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Kirjaudu
      </button>
    </form>

    <p class="mt-6 text-sm text-center">
      Ei vielä tiliä? <a href="./rekisteroidy" class="text-blue-600">Luo tili</a
      >
    </p>
  </div>

  <!-- Oikean puolen kuva -->
  <div class="w-1/2">
    <img
      src="./src/kuva.jpg"
      alt="Kirjautumissivun kuva"
      class="w-full h-full object-cover rounded-l-3xl"
    />
  </div>
</div>
