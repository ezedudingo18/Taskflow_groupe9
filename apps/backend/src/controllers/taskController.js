import * as taskService from '../services/taskService.js';

function throwNotFound() {
  const error = new Error('Tâche introuvable');
  error.statusCode = 404;
  throw error;
}

export async function getTasks(request, response) {
  const tasks = await taskService.listTasks({ owner: request.user._id });
  return response.status(200).json({ tasks });
}

export async function createTask(request, response) {
  const { title, description, status, deadline } = request.body;
  const task = await taskService.createTask({
    owner: request.user._id,
    title,
    description,
    status,
    deadline,
  });
  return response.status(201).json({ task });
}

export async function updateTask(request, response) {
  const { title, description, status, deadline } = request.body;
  const task = await taskService.updateTask({
    _id: request.params._id,
    owner: request.user._id,
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status }),
    ...(deadline !== undefined && { deadline }),
  });
  if (!task) {
    throwNotFound();
  }
  return response.status(200).json({ task });
}

export async function deleteTask(request, response) {
  const task = await taskService.deleteTask({
    _id: request.params._id,
    owner: request.user._id,
  });
  if (!task) {
    throwNotFound();
  }
  return response.status(200).json({ task });
}
