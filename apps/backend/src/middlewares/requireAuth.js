import jwt from 'jsonwebtoken';
import { AuthTokenPayloadSchema } from 'schemas/auth';
import { config } from '../config/env.js';

export function requireAuth(request, response, next) {
  const [scheme, token] = (request.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ error: { message: 'Token manquant' } });
  }

  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return next(error);
  }
  const result = AuthTokenPayloadSchema.safeParse(payload);
  if (!result.success) {
    return response.status(401).json({ error: { message: 'Token invalide' } });
  }

  request.user = { _id: result.data._id };
  return next();
}
