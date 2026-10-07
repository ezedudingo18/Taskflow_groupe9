import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { taskRouter } from './routes/taskRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { openapiDocument } from './openapi.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
  }),
);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.get('/api/openapi.json', (_request, response) => {
  response.json(openapiDocument);
});

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'API - Cours Dev Full stack' });
});
app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  let status = error.statusCode || 500;
  let message = status === 500 ? 'Une erreur interne est survenue' : error.message;
  let details = error.details;

  if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'Le corps JSON est invalide';
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    status = 401;
    message = error.name === 'TokenExpiredError' ? 'Token expiré' : 'Token invalide';
  } else if (error.code === 11000) {
    status = 409;
    const fields = Object.keys(error.keyPattern || error.keyValue || {});
    message = fields.includes('email')
      ? 'Cette adresse e-mail est déjà utilisée'
      : 'Cette ressource existe déjà';
    details = { fields };
  } else if (error.name === 'CastError') {
    status = 400;
    message = 'Identifiant invalide';
  } else if (error.name === 'ValidationError') {
    status = 400;
    message = 'Données invalides';
    details = Object.values(error.errors).map((validationError) => ({
      field: validationError.path,
      message: 'Valeur invalide',
    }));
  }

  return response.status(status).json({
    error: {
      message,
      ...(details && { details }),
    },
  });
});

export default app;
