import * as authService from '../services/authService.js';

// Handle user registration requests.
export async function register(request, response) {
  const user = await authService.register(request.body);
  return response.status(201).json({ user });
}

// Handle user login requests.
export async function login(request, response) {
  const auth = await authService.login(request.body);
  return response.status(200).json(auth);
}
