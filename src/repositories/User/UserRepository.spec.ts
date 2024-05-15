import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../../__mocks__/mockEntityManager.mock";
import { User } from "../../entities/User";
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
    let userRepository: UserRepository
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        id_user: '12345',
        name: 'Test User',
        email: 'test@test.com',
        password: 'password'
    } 

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser,
            findOneReturn: mockUser
        })
        userRepository = new UserRepository(managerMock as EntityManager)
    })

    it('Deve retornar um novo usuário no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('Deve retornar um usuário com base no id do usuário', async () => {
        const response = await userRepository.getUser(mockUser.id_user)
        expect(managerMock.findOne).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('Deve retornar um usuário com base no email e senha', async () => {
        const response = await userRepository.getUserByEmailAndPassword(mockUser.email, mockUser.password)
        expect(managerMock.findOne).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })

    it('Deve deletar um usuário com base no email', async () => {
        const response = await userRepository.deleteUserByEmail(mockUser.email)
        expect(managerMock.delete).toHaveBeenCalled()
    })
});