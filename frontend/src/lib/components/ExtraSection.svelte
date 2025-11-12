<script>
  import { cvData } from '$lib/stores/cvStore';
</script>

<h2>Kerro lisää</h2>

<section class="extra-section">
  <div class="extra-grid">
    <div class="input-group full">
      <label for="extraWork">Työhön liittyviä lisätietoja</label>
      <textarea
        id="extraWork"
        class="summary-textarea"
        placeholder="esim. Valmius matkustaa, erikoisosaaminen tai työskentelytavat..."
        rows="4"
        bind:value={$cvData.extraWork}
      ></textarea>
    </div>

    <div class="input-group full">
      <label for="extraEducation">
        Työn kannalta oleellisia opintoihin tai osaamiseen liittyviä lisätietoja
      </label>
      <textarea
        id="extraEducation"
        class="summary-textarea"
        placeholder="esim. Kurssit, sertifikaatit tai muu osaaminen joka tukee työtä..."
        rows="4"
        bind:value={$cvData.extraEducation}
      ></textarea>
    </div>
  </div>
</section>
