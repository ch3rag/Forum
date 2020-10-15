let BASE_URL = '';
if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = '#';
}

const API_URL = `${BASE_URL}/api/v1`;
async function isAdmin() {
  const response = await fetch(`${BASE_URL}/auth/isAdmin`, {
    headers: {
      authorization: `Bearer ${localStorage.token}`,
    },
  });
  return response.json();
}

async function getAllCategories() {
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
}

async function createCategory(category) {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.token}`,
    },
  });
  return response.json();
}

export {
  isAdmin,
  getAllCategories,
  createCategory,
};
