import { User } from "../entities/User";
import { UserService } from "./UserService";

jest.mock('../repositories/User/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/User/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        const mockUser: User = {
            id_user: '123456',
            name: 'Rodrigo',
            email: 'rodrigo@test.com',
            password: '123456'
        }
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('rodrigo', 'rodrigo@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})
