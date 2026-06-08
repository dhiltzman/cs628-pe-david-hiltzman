const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  getRecipes: () =>
    fetch(`${BASE_URL}/recipes`).then(handleResponse),

  getRecipe: (id) =>
    fetch(`${BASE_URL}/recipes/${id}`).then(handleResponse),

  createRecipe: (data) =>
    fetch(`${BASE_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  updateRecipe: (id, data) =>
    fetch(`${BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  deleteRecipe: (id) =>
    fetch(`${BASE_URL}/recipes/${id}`, { method: 'DELETE' }).then(handleResponse),
};
