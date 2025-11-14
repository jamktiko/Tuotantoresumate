// src/routes/profiilisivu/api.js

export async function fetchCVs() {
  const res = await fetch('http://localhost:4000/my-cvs', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('CV:n haku epäonnistui');
  return res.json();
}

export async function logoutUser() {
  await fetch('http://localhost:4000/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

export function openCV(cv) {
  window.open(`http://localhost:4000${cv.pdfPath}`, '_blank');
}

export function editCV(cv) {
  localStorage.setItem('editCV', JSON.stringify(cv));
  window.location.href = '/';
}

export function createNewCV() {
  localStorage.removeItem('editCV');
  window.location.href = '/paasivu';
}
