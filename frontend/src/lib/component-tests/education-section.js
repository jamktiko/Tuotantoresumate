// education-utils.js

export function addEducation(state) {
  state.educations.push({
    degree: '',
    city: '',
    school: '',
    startDate: '',
    endDate: '',
    description: '',
  });
}

export function removeEducation(state, index) {
  state.educations.splice(index, 1);
}
