import { apiClient } from './client';

export const tasksApi = {
    getAll: async (signal) => {
        const response = await apiClient('/tasks', { signal });
        return response.tasks || [];
    },
    create: (taskData) =>
        apiClient('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
        }),
    update: (id, taskData) =>
        apiClient(`/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(taskData),
        }),
    delete: (id) =>
        apiClient(`/tasks/${id}`, {
            method: 'DELETE',
        }),
};