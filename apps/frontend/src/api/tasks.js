import { apiClient } from './client';

export const tasksApi = {
  getAll: async (signal) => {
    const response = await apiClient('/tasks', { signal });
    return response.tasks || [];
  },
  create: async (task) => {
    const response = await apiClient('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return response.task;
  },
  update: async (_id, changes) => {
    const response = await apiClient(`/tasks/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(changes),
    });
    return response.task;
  },
  delete: (_id) =>
    apiClient(`/tasks/${_id}`, {
      method: 'DELETE',
    }),
};
