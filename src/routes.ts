import { Router, Request, Response } from 'express'
import { UserController } from './controllers/UserController'

export const router = Router()

const userController = new UserController()

router.post('/user', userController.createUser)
router.get('/user/userId/:userId', userController.getUser)
router.get('/user/email/:email', userController.getUserByEmail)
router.delete('/user', userController.deleteUserByEmail)
