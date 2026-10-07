import { apiClient } from './client';

export const tasksApi = {
    getAll: async (signal) => ({ items: (await apiClient('/tasks', { signal })).tasks }),
};
