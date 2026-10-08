import { useAuthStore } from '../stores/auth.store';

const BASE_URL = '/api';

// Send authenticated requests and normalize API errors.
export async function apiClient(endpoint, options = {}) {
  const token = useAuthStore.getState().token;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Clear the local session when the token is rejected.
    useAuthStore.getState().logout();
    throw new Error('Session expirée ou non autorisée');
  }

  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();
  const data = responseText ? JSON.parse(responseText) : {};

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.message || 'Une erreur est survenue');
  }

  return data;
}
