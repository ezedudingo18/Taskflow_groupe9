import * as userService from '../services/userService.js';

export async function getMe(request, response) {
    const user = await userService.getUser(request.user._id);
    return response.status(200).json({ user });
}
