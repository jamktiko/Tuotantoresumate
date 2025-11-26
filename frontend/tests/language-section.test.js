import { describe, it, expect } from 'vitest';
import {
  addLanguage,
  removeLanguage,
} from '../src/lib/component-tests/language-section';

describe('Kielitaitojen logiikan testit', () => {
  it('lisää uuden kielitaidon', () => {
    const state = { languages: [] };

    addLanguage(state);

    // pitäisi olla yksi kieli
    expect(state.languages.length).toBe(1);

    // ja sen pitäisi vastata komponentin rakennetta
    expect(state.languages[0]).toEqual({
      language: '',
      level: 3,
    });
  });

  it('poistaa kielitaidon indeksin perusteella', () => {
    const state = {
      languages: [
        { language: 'Suomi', level: 5 },
        { language: 'Englanti', level: 4 },
        { language: 'Ruotsi', level: 3 },
      ],
    };

    removeLanguage(state, 1); // poistetaan englanti

    expect(state.languages.length).toBe(2);

    // tarkistetaan että jäljelle jäävät ovat A) Suomi, C) Ruotsi
    expect(state.languages[0].language).toBe('Suomi');
    expect(state.languages[1].language).toBe('Ruotsi');
  });
});
