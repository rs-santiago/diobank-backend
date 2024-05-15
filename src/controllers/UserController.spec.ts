import { UserController } from "./UserController";
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn(),
    deleteUserByEmail: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    const userController = new UserController();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo',
                email: 'rodrigo@test.com',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar uma mensagem de erro quando não informado o nome na criação de usuário', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'rodrigo@test.com',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    });

    it('Deve retornar uma mensagem de erro quando não informado o email na criação de usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo',
                email: '',
                password: '123456'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    });

    it('Deve retornar uma mensagem de erro quando não informado o password na criação de usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo',
                email: 'rodrigo@test.com',
                password: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Password obrigatório' })
    });

    it('Deve deletar o usuário informado', async () => {
        const mockRequest = {
            body: {
                email: "test@test.com"
            }
        } as Request
        const mockResponse = makeMockResponse()
        const mockDeleteUser = jest.spyOn(mockUserService, 'deleteUserByEmail')
        await userController.deleteUserByEmail(mockRequest, mockResponse)

        expect(mockDeleteUser).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve retornar uma mensagem de erro quando não informado o email quando deletar o usuário', async () => {
        const mockRequest = {
            body: {}
        } as Request
        const mockResponse = makeMockResponse()
        await userController.deleteUserByEmail(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    });
    
    it('Deve retornar um usuário com base no userId informado', async () => {
        const userId = "test@test.com"
        const mockRequest = makeMockRequest({
            params: {
                userId: userId
            }
        })
        const mockResponse = makeMockResponse()
        const mockGetUser = jest.spyOn(mockUserService, 'getUser')
        await userController.getUser(mockRequest, mockResponse)
        expect(mockGetUser).toHaveBeenCalledWith(userId)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve retornar uma mensagem de erro quando não informado o userId quando deletar o usuário', () => {
        const mockRequest = {
            params: {
                userId: ''
            }
        } as unknown as Request
        const mockResponse = makeMockResponse()
        userController.getUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! userId obrigatório' })
    });

})
