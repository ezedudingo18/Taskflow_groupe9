import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterUserSchema } from 'schemas/auth';
import { config } from '../config/env.js';
import * as userService from './userService.js';

export function register(credentials) {
  const result = RegisterUserSchema.safeParse(credentials);
  if (!result.success) {
    const error = new Error('Données invalides');
    error.statusCode = 400;
    error.details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    throw error;
  }

  return userService.createUser(result.data);
}

export async function login({ email, password }) {
  const user = await userService.getUserCredentialsByEmail(email);

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    return {
      token: jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' }),
    };
  }

  const error = new Error('Identifiants invalides');
  error.statusCode = 401;
  throw error;
}
