<script>
  import { cvData } from '$lib/stores/cvStore';
  import { slide } from 'svelte/transition';
  let showSummary = false;
</script>

<!-- Toggle button -->
<button
  class="extra-toggle"
  type="button"
  aria-expanded={showSummary}
  aria-controls="summary-section"
  on:click={() => (showSummary = !showSummary)}
>
  {#if showSummary}
    Piilota ammattiyhteenveto
  {:else}
    Ammattiyhteenveto
  {/if}

  <!-- Right-side arrow icon -->
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

<!-- Collapsible section -->
{#if showSummary}
  <div id="summary-section" class="extra-info" in:slide out:slide>
    <div class="input-group">
      <label for="summary-input" class="summary-label">
        Korosta yleistä ammatillista kokemustasi, vahvuuksiasi tai
        erityisosaamistasi:
      </label>
      <textarea
        id="summary-input"
        bind:value={$cvData.summary}
        rows="4"
        class="summary-textarea"
        placeholder="Kirjoita lyhyt ammatillinen yhteenveto..."
      ></textarea>
    </div>
  </div>
{/if}
