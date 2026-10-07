import { Router } from 'express';
import { LoginUserSchema, RegisterUserSchema } from 'schemas/auth';
import * as authController from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';

export const authRouter = Router();

authRouter.post('/register', validateBody(RegisterUserSchema), authController.register);
authRouter.post('/login', validateBody(LoginUserSchema), authController.login);
