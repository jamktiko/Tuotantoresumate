import { describe, it, expect } from 'vitest';
import {
  addExperience,
  removeExperience,
} from '../src/lib/component-tests/experience-section';

describe('Työkokemuslogiikan testit', () => {
  it('lisää uuden työkokemuksen', () => {
    const state = { experiences: [] };

    addExperience(state);

    expect(state.experiences.length).toBe(1);
    expect(state.experiences[0]).toEqual({
      title: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  });

  it('poistaa työkokemuksen indeksin perusteella', () => {
    const state = {
      experiences: [{ title: 'A' }, { title: 'B' }, { title: 'C' }],
    };

    removeExperience(state, 1);

    expect(state.experiences.length).toBe(2);
    expect(state.experiences.map((e) => e.title)).toEqual(['A', 'C']);
  });
});
