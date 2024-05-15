import { User } from "../entities/User";
import { UserService } from "./UserService";
import * as jwt from "jsonwebtoken"


jest.mock('../repositories/User/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/User/UserRepository')
const mockUser: User = {
    id_user: '123456',
    name: 'Rodrigo',
    email: 'rodrigo@test.com',
    password: '123456'
}

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('rodrigo', 'rodrigo@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('Deve retorn um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation((): Promise<User | null> => {
            return Promise.resolve(mockUser);
        })
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('rodrigo@test.com', '123456')
        expect(token).toBe('token')
    })

    it('Deve retorn um erro, caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation((): Promise<User | null> => {
            return Promise.resolve(null);
        })
        await expect(userService.getToken('invalid@test.com', 'invalid'))
            .rejects
            .toThrowError(new Error('Email/Password inválido!'))
    })
})
