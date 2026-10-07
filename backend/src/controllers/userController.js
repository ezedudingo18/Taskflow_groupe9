import * as userService from '../services/userService.js'

export async function getAllUsers(request, response) {
    try {
        const users = await userService.listUsers()
        return response.status(200).json({ message: "Utilisateurs récupérés : ", users: users })
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function getUserById(request, response) {
    try {
        const user = await userService.getUserById(request.params.id)
        if (!user) {
            return response.status(404).json({ message: "Utilisateur non trouvé" })
        }
        return response.status(200).json({ message: "Utilisateur récupéré : ", user: user })
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}

export async function createUser(request, response) {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(400).json({ message: "Champs email et password requis" })
        }

        const newUser = await userService.createUser({ email, password })
        return response.status(201).json({ message: "Utilisateur créé avec succès : ", user: newUser })
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
}

export async function updateUser(request, response) {
    try {
        const updatedUser = await userService.updateUser(request.params.id, request.body)
        if (!updatedUser) {
            return response.status(404).json({ message: "Utilisateur non trouvé" })
        }
        return response.status(200).json({ message: "Utilisateur mis à jour : ", user: updatedUser })
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
}

export async function deleteUser(request, response) {
    try {
        const deletedUser = await userService.deleteUser(request.params.id)
        if (!deletedUser) {
            return response.status(404).json({ message: "Utilisateur non trouvé" })
        }
        return response.status(200).json({ message: "Utilisateur supprimé avec succès" })
    } catch (error) {
        return response.status(500).json({ message: error.message })
    }
}