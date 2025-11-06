<script>
  import { cvData } from '$lib/stores/cvStore';
  import { availableLanguages, levelLabels } from '$lib/utils/constants';
  import { slide } from 'svelte/transition';

  function add() {
    cvData.update((d) => {
      d.languages.push({ language: '', level: 3 });
      return d;
    });
  }

  function remove(i) {
    cvData.update((d) => {
      d.languages.splice(i, 1);
      return d;
    });
  }
</script>

<h2>Kielitaidot</h2>

{#each $cvData.languages as lang, i}
  <div class="language-entry" in:slide out:slide>
    <div class="language-grid">
      <div class="input-group">
        <label for={'language-' + i}>Kieli</label>
        <div class="custom-select-wrapper">
          <select id={'language-' + i} bind:value={lang.language}>
            <option value="">Valitse kieli...</option>
            {#each availableLanguages as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
          <svg
            class="chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div class="input-group">
        <label for={'level-' + i}>Taitotaso</label>
        <div class="custom-select-wrapper">
          <select id={'level-' + i} bind:value={lang.level}>
            {#each [0, 1, 2, 3, 4, 5] as n}
              <option value={n}>{levelLabels[n]}</option>
            {/each}
          </select>
          <svg
            class="chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div class="button-row">
        <button
          type="button"
          class="photo-delete-button"
          on:click={() => remove(i)}
        >
          Poista kieli
        </button>
      </div>
    </div>
  </div>
{/each}

<button type="button" class="photo-button" on:click={add}>
  + Lisää kieli
</button>
