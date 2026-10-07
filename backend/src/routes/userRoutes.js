import { Router } from 'express';
import * as userController from "../controllers/userController.js"
import { requireAuth } from '../middlewares/requireAuth.js'


const router = Router()

// Sécurise l'ensemble des routes utilisateurs
router.use(requireAuth)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRouter = router;