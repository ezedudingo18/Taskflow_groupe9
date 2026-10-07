import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import * as userService from './userService.js';

export function register(credentials) {
  return userService.createUser(credentials);
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
