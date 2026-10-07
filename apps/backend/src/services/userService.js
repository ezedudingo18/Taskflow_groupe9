import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const PASSWORD_SALT_ROUNDS = 10;

export async function createUser({ email, password }) {
    const passwordHash = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    return User.create({ email, passwordHash });
}

export function getUser(_id) {
    return User.findById(_id).select('-passwordHash').lean();
}

export function getUserCredentialsByEmail(email) {
    return User.findOne({ email }).select('+passwordHash').lean();
}
