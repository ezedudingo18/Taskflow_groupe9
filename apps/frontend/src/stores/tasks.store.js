import { create } from 'zustand';
import * as taskService from '../api/services/taskService.js';

export const useTasksStore = create((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  clearTasks: () => set({ tasks: [], isLoading: false, error: null }),

  fetchTasks: async (signal) => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.listTasks(signal);
      set({ tasks, isLoading: false });
    } catch (error) {
      if (error.name === 'AbortError') return;
      set({ error: error.message, isLoading: false });
    }
  },

  addTask: async (task) => {
    set({ error: null });
    try {
      const createdTask = await taskService.createTask(task);
      set((state) => ({ tasks: [createdTask, ...state.tasks] }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateTask: async (_id, changes) => {
    set({ error: null });
    try {
      const updatedTask = await taskService.updateTask(_id, changes);
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === _id ? updatedTask : task)),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteTask: async (_id) => {
    set({ error: null });
    try {
      await taskService.deleteTask(_id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== _id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
