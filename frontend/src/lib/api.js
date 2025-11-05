import { API_URL } from './config.js';

export async function createCV(formData) {
  const res = await fetch(`${API_URL}/create-cv`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    throw new Error('CV:n luonti epäonnistui');
  }

  return await res.json();
}