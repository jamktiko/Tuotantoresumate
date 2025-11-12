<script>
  import { cvData } from '$lib/stores/cvStore';

  function addExperience() {
    cvData.update((d) => {
      d.experiences.push({
        title: '',
        company: '',
        city: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      return d;
    });
  }

  function removeExperience(index) {
    cvData.update((d) => {
      d.experiences.splice(index, 1);
      return d;
    });
  }
</script>

<h2>Työkokemus</h2>

{#each $cvData.experiences as exp, i}
  <div class="experience-card">
    <div class="experience-grid">
      <div class="input-group">
        <label for={'jobTitle-' + i}>Työnimike</label>
        <input
          id={'jobTitle-' + i}
          placeholder="esim. Senior Developer"
          bind:value={exp.title}
        />
      </div>

      <div class="input-group">
        <label for={'city-' + i}>Kaupunki</label>
        <input
          id={'city-' + i}
          placeholder="esim. Lontoo"
          bind:value={exp.city}
        />
      </div>

      <div class="input-group company">
        <label for={'company-' + i}>Yrityksen nimi</label>
        <input
          id={'company-' + i}
          placeholder="esim. Startup Oy"
          bind:value={exp.company}
        />
      </div>

      <div class="input-group date">
        <label for={'start-' + i}>Aloituspäivä</label>
        <input id={'start-' + i} type="date" bind:value={exp.startDate} />
      </div>

      <div class="input-group date">
        <label for={'end-' + i}>Päättymispäivä</label>
        <input id={'end-' + i} type="date" bind:value={exp.endDate} />
      </div>

      <div class="input-group full">
        <label for={'desc-' + i}>Kuvaus</label>
        <textarea
          id={'desc-' + i}
          class="input full"
          placeholder="esim. Työskentelin Frontend-kehityksessä ja vastasin käyttöliittymien suunnittelusta..."
          bind:value={exp.description}
        ></textarea>
      </div>

      <button
        type="button"
        class="photo-delete-button"
        on:click={() => removeExperience(i)}
      >
        Poista
      </button>
    </div>
  </div>
{/each}

<button type="button" class="photo-button" on:click={addExperience}>
  + Lisää työkokemus
</button>
