import { describe, it, expect } from 'vitest';
import {
  addEducation,
  removeEducation,
} from '../src/lib/component-tests/education-section.js';

describe('Koulutuslogiikan testit', () => {
  it('lisää uuden koulutuskohdan', () => {
    const state = { educations: [] };

    addEducation(state);

    expect(state.educations.length).toBe(1);
  });

  it('poistaa koulutuskohdan indeksin perusteella', () => {
    const state = {
      educations: [{ degree: 'A' }, { degree: 'B' }, { degree: 'C' }],
    };

    removeEducation(state, 1);

    expect(state.educations.length).toBe(2);
    expect(state.educations[0].degree).toBe('A');
    expect(state.educations[1].degree).toBe('C');
  });
});
