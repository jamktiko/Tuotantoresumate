<script>
  import { cvData } from '$lib/stores/cvStore';
  import { slide } from 'svelte/transition';

  function add() {
    cvData.update((d) => {
      d.references.push({
        name: '',
        title: '',
        company: '',
        relation: '',
        phone: '',
        email: '',
      });
      return d;
    });
  }

  function remove(i) {
    cvData.update((d) => {
      d.references.splice(i, 1);
      return d;
    });
  }
</script>

<h2>Suosittelijat</h2>

{#each $cvData.references as ref, i}
  <div class="reference-card" in:slide out:slide>
    <div class="reference-grid">
      <div class="input-group">
        <label for={'ref-name-' + i}>Nimi</label>
        <input
          id={'ref-name-' + i}
          placeholder="esim. Maija Meikäläinen"
          bind:value={ref.name}
        />
      </div>

      <div class="input-group">
        <label for={'ref-title-' + i}>Titteli</label>
        <input
          id={'ref-title-' + i}
          placeholder="esim. Esimies, Projektipäällikkö"
          bind:value={ref.title}
        />
      </div>

      <div class="input-group">
        <label for={'ref-company-' + i}>Yritys</label>
        <input
          id={'ref-company-' + i}
          placeholder="esim. Startup Oy"
          bind:value={ref.company}
        />
      </div>

      <div class="input-group full">
        <label for={'ref-relation-' + i}>Suhde</label>
        <input
          id={'ref-relation-' + i}
          placeholder="esim. Entinen esimies vuosilta 2020–2023"
          bind:value={ref.relation}
        />
      </div>

      <div class="input-group">
        <label for={'ref-phone-' + i}>Puhelinnumero</label>
        <input
          id={'ref-phone-' + i}
          placeholder="esim. 040 123 4567"
          bind:value={ref.phone}
        />
      </div>

      <div class="input-group">
        <label for={'ref-email-' + i}>Sähköposti</label>
        <input
          id={'ref-email-' + i}
          placeholder="esim. maija@example.com"
          bind:value={ref.email}
        />
      </div>

      <button
        type="button"
        class="photo-delete-button"
        on:click={() => remove(i)}
      >
        Poista suosittelija
      </button>
    </div>
  </div>
{/each}

<button type="button" class="photo-button" on:click={add}>
  + Lisää suosittelija
</button>

<style>
  .reference-card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: var(--sp-5);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    margin-bottom: 16px;
  }

  .reference-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--sp-4);
  }

  .reference-grid .full {
    grid-column: 1 / -1;
  }

  .input-group label {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 6px;
    color: var(--header);
    display: block;
  }

  :global(.dark) .reference-card {
    background: var(--card);
    border: 1px solid var(--line);
    box-shadow: var(--shadow-1);
    color: var(--ink);
  }

  :global(.dark) .reference-card input {
    background: var(--card-muted);
    border-color: var(--line);
    color: var(--ink);
  }

  :global(.dark) .reference-card input::placeholder {
    color: var(--muted);
  }

  :global(.dark) .reference-card label {
    color: var(--ink);
  }

  :global(.dark) .photo-delete-button {
    background: rgba(239, 107, 107, 0.15);
    border: 1px solid rgba(239, 107, 107, 0.25);
    color: #d96b6b;
  }

  :global(.dark) .photo-delete-button:hover {
    background: rgba(239, 107, 107, 0.25);
  }

  :global(.dark) .photo-button {
    background: rgba(4, 212, 240, 0.15);
    border: 1px solid rgba(4, 212, 240, 0.25);
    color: var(--brand);
  }

  :global(.dark) .photo-button:hover {
    background: rgba(4, 212, 240, 0.25);
  }
</style>
