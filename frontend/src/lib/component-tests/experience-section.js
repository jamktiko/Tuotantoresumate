export function addExperience(state) {
  state.experiences.push({
    title: '',
    company: '',
    city: '',
    startDate: '',
    endDate: '',
    description: '',
  });
}

export function removeExperience(state, index) {
  state.experiences.splice(index, 1);
}
