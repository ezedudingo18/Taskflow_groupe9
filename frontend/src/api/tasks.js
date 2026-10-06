import { apiClient } from './client';

export const tasksApi = {
    getAll: async () => ({ items: (await apiClient('/tasks')).tasks }),
};
