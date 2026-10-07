import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function requireAuth(request, response, next) {
    const [scheme, token] = (request.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        return response.status(401).json({ error: { message: 'Token manquant' } });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    request.user = { _id: payload._id };
    return next();
}
