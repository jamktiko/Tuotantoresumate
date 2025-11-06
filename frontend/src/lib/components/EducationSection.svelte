<script>
  import { cvData } from '$lib/stores/cvStore';

  function add() {
    cvData.update((d) => {
      d.educations.push({
        degree: '',
        city: '',
        school: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      return d;
    });
  }

  function remove(i) {
    cvData.update((d) => {
      d.educations.splice(i, 1);
      return d;
    });
  }
</script>

<h2>Koulutus</h2>

{#each $cvData.educations as edu, i}
  <div class="education-card">
    <div class="education-grid">
      <div class="input-group">
        <label for={'degree-' + i}>Tutkinto</label>
        <input
          id={'degree-' + i}
          placeholder="esim. Tradenomi (AMK)"
          bind:value={edu.degree}
        />
      </div>

      <div class="input-group">
        <label for={'city-' + i}>Kaupunki</label>
        <input
          id={'city-' + i}
          placeholder="esim. Helsinki"
          bind:value={edu.city}
        />
      </div>

      <div class="input-group company">
        <label for={'school-' + i}>Oppilaitos</label>
        <input
          id={'school-' + i}
          placeholder="esim. Haaga-Helia ammattikorkeakoulu"
          bind:value={edu.school}
        />
      </div>

      <div class="input-group date">
        <label for={'start-' + i}>Aloituspäivä</label>
        <input id={'start-' + i} type="date" bind:value={edu.startDate} />
      </div>

      <div class="input-group date">
        <label for={'end-' + i}>Valmistumispäivä</label>
        <input id={'end-' + i} type="date" bind:value={edu.endDate} />
      </div>

      <div class="input-group full">
        <label for={'desc-' + i}>Kuvaus</label>
        <textarea
          id={'desc-' + i}
          class="input full"
          placeholder="esim. Pääaineena digitaalinen markkinointi, sivuaineena liiketoiminnan kehittäminen..."
          bind:value={edu.description}
        ></textarea>
      </div>

      <button
        type="button"
        class="photo-delete-button"
        on:click={() => remove(i)}
      >
        Poista
      </button>
    </div>
  </div>
{/each}

<button type="button" class="photo-button" on:click={add}>
  + Lisää koulutus
</button>
