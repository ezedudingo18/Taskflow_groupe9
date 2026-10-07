import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { taskRouter } from './routes/taskRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
  }),
);

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'API - Cours Dev Full stack' });
});
app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((error, _request, response, _next) => {
  const status =
    error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'
      ? 401
      : error.statusCode || 500;
  const message = status === 500 ? 'Une erreur interne est survenue' : error.message;
  return response.status(status).json({
    error: {
      message,
      ...(error.details && { details: error.details }),
    },
  });
});

export default app;
