import { apiClient } from '../client.js';

// Fetch the profile of the authenticated user.
export function getCurrentUser(token) {
  return apiClient('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
