import mongoose from 'mongoose'
import { Task } from '../models/Task.js'

export function listTasks(ownerId, { status } = {}) {
    const filter = { ownerId };
    if (status) filter.status = status;
    return Task.find(filter)
}

export async function createTask({ ownerId, title, description, status, deadline }) {
    const task = await Task.create({
        ownerId,
        title: title.trim(),
        description,
        status,
        deadline
    });
    return task;
}

export async function updateTask(ownerId, taskId, updates) {
    const task = await Task.findOne({ _id: taskId, ownerId });

    if (!task) {
        throw new Error("Tâche introuvable");
    }

    const allowedFields = ['title', 'description', 'status', 'deadline'];

    for (const key of Object.keys(updates)) {
        if (allowedFields.includes(key)) {
            task[key] = updates[key];
        }
    }

    await task.save();
    return task;
}

export async function deleteTask(ownerId, taskId) {
    const task = await Task.findOneAndDelete({ _id: taskId, ownerId });

    if (!task) {
        throw new Error("Tâche introuvable ou non autorisée");
    }

    return task;
}