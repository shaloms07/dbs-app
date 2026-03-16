export function isTokenValid(token) {
  if (!token) return false;
  if (token.startsWith('mock_jwt_token_')) return true;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getToken() {
  return localStorage.getItem('tr_jwt');
}

export function setToken(token) {
  localStorage.setItem('tr_jwt', token);
}

export function removeToken() {
  localStorage.removeItem('tr_jwt');
}

export function getUserFromStorage() {
  const user = localStorage.getItem('tr_user');
  return user ? JSON.parse(user) : null;
}

export function setUserInStorage(user) {
  localStorage.setItem('tr_user', JSON.stringify(user));
}

export function removeUserFromStorage() {
  localStorage.removeItem('tr_user');
}
