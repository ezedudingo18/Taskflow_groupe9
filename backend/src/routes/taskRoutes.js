import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const taskRouter = Router();

taskRouter.get('/', requireAuth, taskController.getAllTasks);
// taskRouter.get('/:id', taskController.getTaskById);
taskRouter.post('/', requireAuth, taskController.newTask);
taskRouter.patch('/:id', requireAuth, taskController.updateTask);
taskRouter.delete('/:id', requireAuth, taskController.deleteTask);