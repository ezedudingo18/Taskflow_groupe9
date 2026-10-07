import { Router } from 'express';
import { CreateTaskSchema, TaskParamsSchema, UpdateTaskSchema } from 'schemas';
import * as taskController from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateParams } from '../middlewares/validateParams.js';

export const taskRouter = Router();

taskRouter.get('/', requireAuth, taskController.getTasks);
taskRouter.post('/', requireAuth, validateBody(CreateTaskSchema), taskController.createTask);
taskRouter.patch(
  '/:_id',
  requireAuth,
  validateParams(TaskParamsSchema),
  validateBody(UpdateTaskSchema),
  taskController.updateTask,
);
taskRouter.delete(
  '/:_id',
  requireAuth,
  validateParams(TaskParamsSchema),
  taskController.deleteTask,
);
