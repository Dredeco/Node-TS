import { Request } from "express";
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const db = {
        name: 'Andre',
        email: 'andre@test.com'
    }

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockResquest = {
            body: {
                name: 'Andre',
                email: 'andre@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
        })

    it('Deve apresentar erro se o nome estiver vazio', () => {
        const mockResquest = {
            body: {
                name: '',
                email: 'andre@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request - Nome inválido' })
    })

    it('Deve apresentar erro se o E-mail estiver vazio', () => {
        const mockResquest = {
            body: {
                name: 'André',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request - E-mail inválido' })
    })

    it('Deve retornar uma lista com todos os usuários', () => {
        const mockResquest = {} as Request
        const mockResponse = makeMockResponse()

            userController.getAllUsers(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
    })

    it('Deve deletar o usuario da lista', () => {
        const mockResquest = {
            body: {
                name: 'André',
                email: 'andre@dio.com'
            }
        } as Request
        const mockResponse = makeMockResponse()

            userController.deleteUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
    })
})