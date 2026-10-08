import * as userService from '../services/userService.js';
import { AppError } from '../errors/AppError.js';

export async function getMe(request, response) {
  const user = await userService.getUser(request.user._id);
  if (!user) {
    throw new AppError('Utilisateur introuvable', 404);
  }
  return response.status(200).json({ user });
}
