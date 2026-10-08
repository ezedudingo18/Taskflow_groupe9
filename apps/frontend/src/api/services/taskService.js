import { apiClient } from '../client.js';

// Fetch all tasks for the authenticated user.
export async function listTasks(signal) {
  const response = await apiClient('/tasks', { signal });
  return response.tasks || [];
}

// Create a task for the authenticated user.
export async function createTask(task) {
  const response = await apiClient('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
  return response.task;
}

// Update selected fields of an existing task.
export async function updateTask(_id, changes) {
  const response = await apiClient(`/tasks/${_id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  });
  return response.task;
}

// Delete an existing task.
export function deleteTask(_id) {
  return apiClient(`/tasks/${_id}`, {
    method: 'DELETE',
  });
}
