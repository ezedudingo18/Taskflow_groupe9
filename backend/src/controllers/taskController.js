import * as taskService from '../services/taskService.js'

export async function getAllTasks(request, response) {
    const tasks = await taskService.listTasks(request.userId)
    return response.status(200).json({ message: "Todos récupérées : ", tasks: tasks })
}

export async function newTask(request, response) {
    try {
        const task = await taskService.createTask({
            ownerId: request.userId,
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            deadline: request.body.deadline
        });
        return response.status(201).json({ message: "Tâche créée", task })
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
}

export async function updateTask(request, response) {
    try {
        const task = await taskService.updateTask(
            request.userId,
            request.params.id,
            request.body
        );
        return response.status(200).json({ message: "Tâche mise à jour", task });
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
}

export async function deleteTask(request, response) {
    try {
        const task = await taskService.deleteTask(request.userId, request.params.id);
        return response.status(200).json({ message: "Tâche supprimée", task });
    } catch (error) {
        return response.status(404).json({ message: error.message });
    }
}