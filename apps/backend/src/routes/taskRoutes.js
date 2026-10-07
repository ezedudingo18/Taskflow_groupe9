import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/requireAuth.js';

export const taskRouter = Router();

taskRouter.get('/', requireAuth, taskController.getTasks);
taskRouter.post('/', requireAuth, taskController.createTask);
taskRouter.patch('/:_id', requireAuth, taskController.updateTask);
taskRouter.delete('/:_id', requireAuth, taskController.deleteTask);