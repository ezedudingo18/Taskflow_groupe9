import { create } from 'zustand';
import { tasksApi } from '../api/tasks';

export const useTasksStore = create((set) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await tasksApi.getAll();
            set({ tasks: res.items || [], isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    addTask: async (taskData) => {
        set({ error: null });
        try {
            const newTask = await tasksApi.create(taskData);
            set((state) => ({ tasks: [newTask, ...state.tasks] }));
        } catch (err) {
            set({ error: err.message });
            throw err;
        }
    },

    updateTask: async (id, partialData) => {
        set({ error: null });
        try {
            const updatedTask = await tasksApi.update(id, partialData);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
            }));
        } catch (err) {
            set({ error: err.message });
            throw err;
        }
    },

    deleteTask: async (id) => {
        set({ error: null });
        try {
            await tasksApi.delete(id);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id),
            }));
        } catch (err) {
            set({ error: err.message });
        }
    },
}));