import { useAuthStore } from '../stores/auth.store';

const BASE_URL = '/api';

export async function apiClient(endpoint, options = {}) {
    const token = useAuthStore.getState().token;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        useAuthStore.getState().logout();
        throw new Error('Session expirée ou non autorisée');
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const errorMessage = data?.error?.message || 'Une erreur est survenue';
        throw new Error(errorMessage);
    }

    return data;
}