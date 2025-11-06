<script>
  import { cvData } from '$lib/stores/cvStore';
  import { skillLevels } from '$lib/utils/constants';
  import { slide } from 'svelte/transition';

  function add() {
    cvData.update((d) => {
      d.skills.push({ nimi: '', opittu: '', taso: 'Aloittelija' });
      return d;
    });
  }

  function remove(i) {
    cvData.update((d) => {
      d.skills.splice(i, 1);
      return d;
    });
  }
</script>

<h2>Taidot</h2>

{#each $cvData.skills as skill, i}
  <div class="skill-entry" in:slide out:slide>
    <div class="input-group">
      <label for={'skill-name-' + i}>Taidon nimi</label>
      <input
        id={'skill-name-' + i}
        placeholder="esim. JavaScript, Projektinhallinta"
        bind:value={skill.nimi}
      />
    </div>

    <div class="input-group">
      <label for={'skill-source-' + i}>Missä opittu</label>
      <input
        id={'skill-source-' + i}
        placeholder="esim. Työkokemuksen kautta tai koulussa"
        bind:value={skill.opittu}
      />
    </div>

    <div class="input-group">
      <label for={'skill-level-' + i}>Taitotaso</label>
      <div class="custom-select-wrapper">
        <select id={'skill-level-' + i} bind:value={skill.taso}>
          {#each skillLevels as level}
            <option value={level}>{level}</option>
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
        Poista taito
      </button>
    </div>
  </div>
{/each}

<button type="button" class="photo-button" on:click={add}>
  + Lisää taito
</button>
