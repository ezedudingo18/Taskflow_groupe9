import { Task } from '../models/Task.js';

// List tasks owned by a user.
export function listTasks({ owner, status } = {}) {
  const filter = status ? { owner, status } : { owner };
  return Task.find(filter).sort({ createdAt: -1 });
}

// Create a task for its owner.
export function createTask({ owner, title, description, status, deadline }) {
  return Task.create({
    owner,
    title,
    description,
    status,
    deadline,
  });
}

// Update a task owned by the requester.
export function updateTask({ _id, owner, ...changes }) {
  return Task.findOneAndUpdate(
    { _id, owner },
    { $set: changes },
    { returnDocument: 'after', runValidators: true },
  );
}

// Delete a task owned by the requester.
export function deleteTask({ _id, owner }) {
  return Task.findOneAndDelete({ _id, owner });
}
