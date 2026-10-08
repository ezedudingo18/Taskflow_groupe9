import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterUserSchema } from 'schemas/auth';
import { config } from '../config/env.js';
import * as userService from './userService.js';
import { AppError } from '../errors/AppError.js';
import { ValidationError } from '../errors/ValidationError.js';

export function register(credentials) {
  const result = RegisterUserSchema.safeParse(credentials);
  if (!result.success) {
    throw new ValidationError('Données invalides', result.error.issues);
  }

  return userService.createUser(result.data);
}

export async function login({ email, password }) {
  const user = await userService.getUserCredentialsByEmail(email);

  if (user && bcrypt.compare(password, user.passwordHash)) {
    return {
      token: jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' }),
    };
  }

  throw new AppError('Identifiants invalides', 401);
}
