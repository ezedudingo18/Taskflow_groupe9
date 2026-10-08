import { apiClient } from '../client.js';

// Create a new user account.
export function register(email, password) {
  return apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// Authenticate a user and return an access token.
export function login(email, password) {
  return apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
