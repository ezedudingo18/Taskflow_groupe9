// Tableau en mémoire pour simuler la base de données
let mockTasks = [
    {
        id: 'mock-1',
        title: 'Tâche de test 1',
        status: 'todo',
        description: 'Première tâche de test en local',
        dueDate: '2026-10-15',
    },
    {
        id: 'mock-2',
        title: 'Tâche de test 2',
        status: 'done',
        description: '',
        dueDate: null,
    },
];

export const tasksApi = {
    getAll: async () => {
        return { items: [...mockTasks] };
    },

    create: async (taskData) => {
        const newTask = {
            id: String(Date.now()),
            status: 'todo',
            description: '',
            dueDate: null,
            ...taskData,
        };
        mockTasks.unshift(newTask);
        return newTask;
    },

    update: async (id, taskData) => {
        mockTasks = mockTasks.map((task) =>
            task.id === id ? { ...task, ...taskData } : task
        );
        return mockTasks.find((task) => task.id === id);
    },

    delete: async (id) => {
        mockTasks = mockTasks.filter((task) => task.id !== id);
        return null;
    },
};

// export const tasksApi = {
//     getAll: () => apiClient('/tasks'),
//     create: (taskData) =>
//         apiClient('/tasks', {
//             method: 'POST',
//             body: JSON.stringify(taskData),
//         }),
//     update: (id, taskData) =>
//         apiClient(`/tasks/${id}`, {
//             method: 'PATCH',
//             body: JSON.stringify(taskData),
//         }),
//     delete: (id) =>
//         apiClient(`/tasks/${id}`, {
//             method: 'DELETE',
//         }),
// };