<script>
  import { cvData } from '$lib/stores/cvStore';
  import { createCV, fillRandom } from '$lib/utils/cvHelpers';
  import { fly, slide } from 'svelte/transition';
  import { tick } from 'svelte';

  let showDropdown = false;
  let showMenu = false;
  let isLoading = false;
  let isSuccess = false;
  let progress = 0;

  function setTemplate(t) {
    cvData.update((d) => ({ ...d, template: t }));
    showDropdown = false;
  }

  async function handleDownload() {
    if (isLoading) return;
    isLoading = true;
    isSuccess = false;
    progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) progress = 100;
    }, 200);

    try {
      await createCV(true);
      clearInterval(interval);
      progress = 100;
      await tick();
      isSuccess = true;
    } catch (err) {
      console.error('CV download failed:', err);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        isLoading = false;
        isSuccess = false;
        progress = 0;
      }, 2500);
    }
  }
</script>

<header class="main-header" transition:fly={{ y: -8, duration: 150 }}>
  <div class="left-controls">
    <div class="template-dropdown">
      <button
        class="dropdown-toggle"
        on:click={() => (showDropdown = !showDropdown)}
      >
        {#if $cvData.template === 'Playful'}Playful{/if}
        {#if $cvData.template === 'modern'}Modern{/if}
        {#if $cvData.template === 'Vintage'}Vintage{/if}
        {#if $cvData.template === 'ArmyGreen'}Army Green{/if}
        {#if $cvData.template === 'Classic'}Classic{/if}
        {#if $cvData.template === 'Dark'}Dark{/if}
        {#if $cvData.template === 'Simplistic'}Simplistic{/if}
        ▾
      </button>

      {#if showDropdown}
        <ul class="dropdown-menu" role="menu">
          <li>
            <button
              class="dropdown-item"
              on:click={() => setTemplate('Playful')}>Playful</button
            >
          </li>
          <li>
            <button class="dropdown-item" on:click={() => setTemplate('modern')}
              >Modern</button
            >
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => setTemplate('Vintage')}>Vintage</button
            >
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => setTemplate('ArmyGreen')}>Army Green</button
            >
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => setTemplate('Classic')}>Classic</button
            >
          </li>
          <li>
            <button class="dropdown-item" on:click={() => setTemplate('Dark')}
              >Dark</button
            >
          </li>
          <li>
            <button
              class="dropdown-item"
              on:click={() => setTemplate('Simplistic')}>Simplistic</button
            >
          </li>
        </ul>
      {/if}
    </div>

    <!-- ✅ CV Download Button -->
    <button
      class="cv-download-btn {isLoading ? 'loading' : ''} {isSuccess
        ? 'success'
        : ''}"
      on:click={handleDownload}
    >
      <span class="icon">
        {#if isSuccess}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
            class="success-check"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline class="arrow" points="7 10 12 15 17 10"></polyline>
            <line class="arrow" x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        {/if}
      </span>

      <span class="button-text">
        {#if isLoading}
          Ladataan...
        {:else if isSuccess}
          Valmis!
        {:else}
          Lataa CV
        {/if}
      </span>
      <div class="progress-bar" style="width: {progress}%;"></div>
    </button>
  </div>

  <h1>Resumate</h1>

  <div class="right-controls">
    <button
      class="hamburger"
      on:click={() => (showMenu = !showMenu)}
      aria-label="Menu"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </div>
</header>

<!-- ✅ Slide-down mobile menu -->
{#if showMenu}
  <nav class="mobile-menu" transition:slide>
    <ul>
      <li><button on:click={fillRandom}>Täytä esimerkkitiedoilla</button></li>
      <li><button on:click={handleDownload}>Lataa CV</button></li>
      <li>
        <button on:click={() => alert('Tulossa pian!')}>Asetukset</button>
      </li>
    </ul>
  </nav>
{/if}

{#if isLoading}
  <div class="loader-overlay"><div class="spinner"></div></div>
{/if}
