<script>
  import { cvData } from '$lib/stores/cvStore';
  import { slide } from 'svelte/transition';
  let showExtra = false;
</script>

<button
  type="button"
  class="extra-toggle"
  on:click={() => (showExtra = !showExtra)}
  aria-expanded={showExtra}
>
  {#if showExtra}
    Piilota lisätiedot
  {:else}
    Lisää lisätietoja (syntymäaika, ajokorttiluokka jne.)
  {/if}

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
    aria-hidden="true"
    role="img"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</button>

{#if showExtra}
  <div class="extra-info" in:slide out:slide>
    <div class="row">
      <div class="input-group">
        <label for="birthdate">Syntymäaika</label>
        <input
          id="birthdate"
          bind:value={$cvData.birthdate}
          placeholder="esim. 12.04.1995"
        />
      </div>

      <div class="input-group">
        <label for="driverslicense">Ajokorttiluokat</label>
        <input
          id="driverslicense"
          bind:value={$cvData.driverslicense}
          placeholder="esim. B, AM"
        />
      </div>
    </div>

    <!-- Row 2 -->
    <div class="row">
      <div class="input-group">
        <label for="website">Verkkosivusto</label>
        <input
          id="website"
          bind:value={$cvData.website}
          placeholder="esim. www.mikkomatikainen.fi"
        />
      </div>

      <div class="input-group">
        <label for="linkedin">LinkedIn</label>
        <input
          id="linkedin"
          bind:value={$cvData.linkedin}
          placeholder="esim. linkedin.com/in/mikkomatikainen"
        />
      </div>
    </div>
  </div>
{/if}
