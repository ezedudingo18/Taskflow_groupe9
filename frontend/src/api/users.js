import { apiClient } from './client';

export const usersApi = {
    me: (token) =>
        apiClient('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        }),
};
