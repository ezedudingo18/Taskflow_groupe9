import * as userService from '../services/userService.js';

export async function getMe(request, response) {
  const user = await userService.getUser(request.user._id);
  if (!user) {
    const error = new Error('Utilisateur introuvable');
    error.statusCode = 404;
    throw error;
  }
  return response.status(200).json({ user });
}
