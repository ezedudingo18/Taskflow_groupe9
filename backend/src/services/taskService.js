import { Task } from '../models/Task.js';

export function listTasks({ owner, status } = {}) {
    const filter = status ? { owner, status } : { owner };
    return Task.find(filter).sort({ createdAt: -1 });
}

export function createTask({ owner, title, description, status, deadline }) {
    return Task.create({
        owner,
        title,
        description,
        status,
        deadline,
    });
}

export function updateTask({ _id, ...changes }) {
    return Task.findOneAndUpdate(
        { _id },
        { $set: changes },
        { new: true },
    );
}

export function deleteTask({ _id, owner }) {
    return Task.findOneAndDelete({ _id, owner });
}
