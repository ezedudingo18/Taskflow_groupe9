import { apiClient } from './client';

export const usersApi = {
    me: (token) =>
        apiClient('/users/users', {
            headers: { Authorization: `Bearer ${token}` },
        }),
};
