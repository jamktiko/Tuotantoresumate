<script>
  import { cvData } from '$lib/stores/cvStore';
  import { handlePhotoFile } from '$lib/utils/cvHelpers';

  function onPhotoChange(e) {
    const file = e.target.files?.[0];
    handlePhotoFile(file);
  }

  function removePhoto() {
    $cvData.photoPreview = null;
  }
</script>

<!-- Job title + Photo -->
<div class="row top-row">
  <div class="input-group">
    <label for="jobTitle">Työnimike</label>
    <input
      id="jobTitle"
      bind:value={$cvData.title}
      placeholder="Esim. Frontend kehittäjä"
    />
  </div>

  <div class="photo-upload-group">
    <label for="photoInput">Kuva (valinnainen)</label>
    <div class="photo-input-row">
      <div class="photo-preview-box">
        {#if $cvData.photoPreview}
          <img src={$cvData.photoPreview} alt="Profiilikuva" />
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f8c8d"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="placeholder-icon"
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M16 20c0-2-2-4-4-4s-4 2-4 4"></path>
          </svg>
        {/if}
      </div>

      <label class="photo-button" for="photoInput">
        Lisää valokuva
        <input
          id="photoInput"
          type="file"
          accept="image/*"
          on:change={onPhotoChange}
          aria-label="Lataa profiilikuva"
        />
      </label>

      {#if $cvData.photoPreview}
        <button
          type="button"
          class="photo-delete-button"
          on:click={removePhoto}
        >
          Poista
        </button>
      {/if}
    </div>
  </div>
</div>

<div class="row">
  <div class="input-group">
    <label for="firstName">Etunimi</label>
    <input
      id="firstName"
      bind:value={$cvData.firstName}
      placeholder="esim. Mikko"
    />
  </div>
  <div class="input-group">
    <label for="lastName">Sukunimi</label>
    <input
      id="lastName"
      bind:value={$cvData.lastName}
      placeholder="esim. Matikainen"
    />
  </div>
</div>

<!-- Contact -->
<div class="row">
  <div class="input-group">
    <label for="email">Sähköposti</label>
    <input
      id="email"
      bind:value={$cvData.email}
      type="email"
      placeholder="esim. mikko.matikainen@gmail.com"
    />
  </div>
  <div class="input-group">
    <label for="phone">Puhelinnumero</label>
    <input
      id="phone"
      bind:value={$cvData.phone}
      type="tel"
      placeholder="esim. 040 123 4567"
    />
  </div>
</div>

<div class="row">
  <div class="input-group">
    <label for="postalCode">Postinumero</label>
    <input
      id="postalCode"
      bind:value={$cvData.postalCode}
      placeholder="esim. 00100"
    />
  </div>
  <div class="input-group">
    <label for="city">Kaupunki</label>
    <input id="city" bind:value={$cvData.city} placeholder="esim. Helsinki" />
  </div>
</div>
