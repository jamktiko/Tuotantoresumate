// SkillSection - logiikan util-funktiot (testattavaksi)

export function addSkill(skills) {
  return [...skills, { nimi: '', opittu: '', taso: 'Aloittelija' }];
}

export function removeSkill(skills, index) {
  return skills.filter((_, i) => i !== index);
}
