export function addLanguage(state) {
  state.languages.push({
    language: '',
    level: 3, // oletustaso, sama kuin komponentissa
  });
}

export function removeLanguage(state, index) {
  state.languages.splice(index, 1);
}
