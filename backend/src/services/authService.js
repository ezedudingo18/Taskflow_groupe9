import bcrypt from 'bcryptjs';
import { User } from "../models/User.js"
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export async function register({ email, password }) {
    if (await User.exists({ email })) {
        throw new Error("Email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash });
    return { _id: user._id, email: user.email }
}

export async function login({ email, password }) {
    const user = await User.findOne({ email }).select('+passwordHash');
    const hashedPassword = user.passwordHash;
    console.log(user);
    if (!user || !(await bcrypt.compare(password, hashedPassword))) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: "7d" });
    // console.log(token);
    return { token }
}

export function listUsers() {
    return User.find().select('-passwordHash')
}

export function getUserById(id) {
    return User.findById(id).select('-passwordHash')
}

export async function createUser({ email, password }) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error('Email déjà utilisé')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ email, passwordHash })
    await user.save()

    const result = user.toObject()
    delete result.passwordHash
    return result
}
