import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if(!user.name){
            return response.status(400).json({ message: 'Bad request! Name obrigatório'})
        }

        if(!user.email){
            return response.status(400).json({ message: 'Bad request! Email obrigatório'})
        }

        if(!user.password){
            return response.status(400).json({ message: 'Bad request! Password obrigatório'})
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getUser = async (request: Request, response: Response) => {
        const userId = request.params.userId
        if(!userId){
            return response.status(400).json({ message: 'Bad request! userId obrigatório'})
        }
        const user = await this.userService.getUser(userId)
        return response.status(200).json(user)
    }

    getUserByEmail = async (request: Request, response: Response) => {
        const email = request.params.email
        if(!email){
            return response.status(400).json({ message: 'Bad request! email obrigatório'})
        }
        const user = await this.userService.getUserByEmail(email)
        return response.status(200).json(user)
    }

    deleteUserByEmail = async (request: Request, response: Response) => {
        const user = request.body
        if(!user.email){
            return response.status(400).json({ message: 'Bad request! Email obrigatório'})
        }
        await this.userService.deleteUserByEmail(user.email)
        return response.status(200).json({ message: 'Usuário deletado'})
    }
}
