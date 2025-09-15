<script>
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

<div class="flex min-h-screen">
  <!-- Vasemman puolen lomake -->
  <div class="flex flex-col justify-center w-1/2 px-12 bg-gray-100">
    <h1 class="text-xl font-semibold mb-6">Aloita nyt</h1>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <input
        type="text"
        placeholder="Nimi"
        bind:value={name}
        class="w-full border rounded-full px-4 py-2"
      />

      <input
        type="email"
        placeholder="Sähköposti"
        bind:value={email}
        class="w-full border rounded-full px-4 py-2"
      />

      <input
        type="password"
        placeholder="Salasana"
        bind:value={password}
        class="w-full border rounded-full px-4 py-2"
      />

      <label class="flex items-center space-x-2 text-sm">
        <input type="checkbox" bind:checked={agreed} />
        <span>
          Hyväksyn
          <a href="/terms" class="underline text-blue-600">käyttöehdot</a>
        </span>
      </label>

      <button
        type="submit"
        class="w-full bg-teal-500 text-white py-2 rounded-full"
      >
        Rekisteröidy
      </button>
    </form>

    <div>
      <p class="mt-6 text-sm text-center">
        Onko sinulla jo tili? <a href="../" class="text-blue-600"
          >Kirjaudu sisään</a
        >
      </p>
    </div>

    <!-- Oikean puolen kuva -->
    <div class="w-1/2">
      <img
        src="../src/kuva.jpg"
        alt="Signup illustration"
        class="w-full h-full object-cover rounded-l-3xl"
      />
    </div>
  </div>
</div>
