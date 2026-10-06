import * as userService from '../services/userService.js'

export async function getUser(req, res) {
    res.status(200).json(await userService.getUser(req.userId))
}
