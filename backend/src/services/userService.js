import { User } from "../models/User.js"
import bcrypt from 'bcryptjs';


export async function updateUser(id, { email, password }) {
    const updateData = {}

    if (email) {
        updateData.email = email
    }

    if (password) {
        updateData.passwordHash = await bcrypt.hash(password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select('-passwordHash')

    return updatedUser
}

export const listUsers = async () => {
    return await User.find().select('-passwordHash');
};

export const getUserById = async (id) => {
    return await User.findById(id).select('-passwordHash');
};

export function deleteUser(id) {
    return User.findByIdAndDelete(id)
}