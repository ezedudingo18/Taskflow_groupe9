import { apiClient } from './client';

export const authApi = {
    register: (email, password) =>
        apiClient('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
    login: (email, password) =>
        apiClient('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
};