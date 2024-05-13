import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Rodrigo',
                email: 'rodrigo@test.com'
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
                email: 'rodrigo@test.com'
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
                name: 'Rodrigo'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    });
    
    it('Deve retornar uma lista de usuários', () => {
        const mockRequest = {
            body: {}
        } as Request
        const mockResponse = makeMockResponse()
        const mockGetAllUsers = jest.spyOn(mockUserService, 'getAllUsers')
        userController.getAllUsers(mockRequest, mockResponse)

        expect(mockGetAllUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve deletar o usuário informado', () => {
        const mockRequest = {
            body: {
                email: "test@test.com"
            }
        } as Request
        const mockResponse = makeMockResponse()
        const mockGetAllUsers = jest.spyOn(mockUserService, 'deleteUser')
        userController.deleteUser(mockRequest, mockResponse)

        expect(mockGetAllUsers).toHaveBeenCalled()
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve retornar uma mensagem de erro quando não informado o email quando deletar o usuário', () => {
        const mockRequest = {
            body: {}
        } as Request
        const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Email obrigatório' })
    });
})
