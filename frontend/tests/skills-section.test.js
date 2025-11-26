import { describe, it, expect } from 'vitest';
import {
  addSkill,
  removeSkill,
} from '../src/lib/component-tests/skills-section.js';

describe('SkillSection logiikan testit', () => {
  it('lisää uuden taidon listaan', () => {
    const initial = [];
    const updated = addSkill(initial);

    expect(updated.length).toBe(1);
    expect(updated[0]).toEqual({
      nimi: '',
      opittu: '',
      taso: 'Aloittelija',
    });
  });

  it('ei muuta alkuperäistä listaa', () => {
    const original = [];
    const updated = addSkill(original);

    expect(original).toEqual([]); // alkuperäinen ei muutu
    expect(updated.length).toBe(1);
  });

  it('poistaa taidon indeksillä', () => {
    const list = [
      { nimi: 'JS', opittu: 'koulussa', taso: 'Hyvä' },
      { nimi: 'CSS', opittu: 'itse', taso: 'Hyvä' },
      { nimi: 'Git', opittu: 'työssä', taso: 'Aloittelija' },
    ];

    const updated = removeSkill(list, 1);

    expect(updated.length).toBe(2);
    expect(updated.find((s) => s.nimi === 'CSS')).toBeUndefined();
  });
});
