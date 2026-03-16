// Check if JWT token is valid
export function isTokenValid(token) {
  if (!token) return false;

  try {
    // Decode JWT (don't verify signature on client)
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const expiration = payload.exp * 1000; // Convert to milliseconds

    return expiration > Date.now();
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

// Get JWT from localStorage
export function getToken() {
  return localStorage.getItem('tr_jwt_token');
}

// Set JWT in localStorage
export function setToken(token) {
  localStorage.setItem('tr_jwt_token', token);
}

// Remove JWT from localStorage
export function removeToken() {
  localStorage.removeItem('tr_jwt_token');
}

// Get user from localStorage
export function getUserFromStorage() {
  const user = localStorage.getItem('tr_user');
  return user ? JSON.parse(user) : null;
}

// Set user in localStorage
export function setUserInStorage(user) {
  localStorage.setItem('tr_user', JSON.stringify(user));
}

// Remove user from localStorage
export function removeUserFromStorage() {
  localStorage.removeItem('tr_user');
}
