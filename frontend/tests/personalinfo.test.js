import { describe, it, expect, vi } from 'vitest';
import {
  onPhotoChangeHandler,
  removePhotoHandler,
} from '../src/lib/component-tests/personalinfo.js';

describe('PersonalInfo – kuvankäsittelyn logiikka', () => {
  it('kutsuu handlePhotoFile kun tiedosto annetaan', () => {
    const mockHandler = vi.fn();
    const fakeFile = new File(['dummy'], 'photo.png', { type: 'image/png' });

    onPhotoChangeHandler(mockHandler, fakeFile);

    expect(mockHandler).toHaveBeenCalledOnce();
    expect(mockHandler).toHaveBeenCalledWith(fakeFile);
  });

  it('ei kutsu handlePhotoFile jos file on null', () => {
    const mockHandler = vi.fn();

    onPhotoChangeHandler(mockHandler, null);

    expect(mockHandler).not.toHaveBeenCalled();
  });
});

describe('PersonalInfo – removePhoto logiikka', () => {
  it('asettaa photoPreview null-arvoon', () => {
    const initial = { photoPreview: 'data:image/png;base64,xxx' };

    const updated = removePhotoHandler(initial);

    expect(updated.photoPreview).toBeNull();
  });

  it('säilyttää muut arvot muuttumattomina', () => {
    const initial = {
      photoPreview: 'x',
      firstName: 'Matti',
      lastName: 'Testaaja',
    };

    const updated = removePhotoHandler(initial);

    expect(updated.firstName).toBe('Matti');
    expect(updated.lastName).toBe('Testaaja');
  });
});
