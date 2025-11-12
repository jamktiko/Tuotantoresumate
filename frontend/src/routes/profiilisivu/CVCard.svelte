<script>
  // Otetaan vastaan yksi CV ja kaksi funktiota propsina
  export let cv;
  export let onOpen;
  export let onEdit;
</script>

<div class="cv-template">
  <button class="cv-thumb" on:click={() => onOpen(cv)}>
    <h4>{cv.title}</h4>
  </button>
  <p>{new Date(cv.createdAt).toLocaleDateString('fi-FI')}</p>
  <div class="cv-actions">
    <button on:click={() => onEdit(cv)}>Muokkaa</button>
    <a href={`http://localhost:4000${cv.pdfPath}`} download>⬇️</a>
  </div>
</div>
