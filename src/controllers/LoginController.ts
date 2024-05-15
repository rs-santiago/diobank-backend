import { Request, Response } from 'express'
import { UserService } from '../services/UserService'


export class LoginController {
    userService: UserService
    
    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body

        if(!email){
            return response.status(400).json({ message: 'Bad request! Email obrigatório'})
        }

        if(!password){
            return response.status(400).json({ message: 'Bad request! Password obrigatório'})
        }
        try {
            const token = await this.userService.getToken(email, password)
            return response.status(200).json({ token })
        } catch (error) {
            console.log(error);
            
            return response.status(403).json({ message: "Email/Password inválido!" })
        }
    }

}