import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function requireAuth(req, res, next) {
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Missing token' });
    }
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.userId = payload._id;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
