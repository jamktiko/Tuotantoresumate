// mockattava funktio kuvankäsittelyyn
export function onPhotoChangeHandler(handlePhotoFile, file) {
  if (!file) return;
  handlePhotoFile(file);
}

// photoPreview-arvon nollaaminen (pure logic)
export function removePhotoHandler(cvData) {
  return {
    ...cvData,
    photoPreview: null,
  };
}
