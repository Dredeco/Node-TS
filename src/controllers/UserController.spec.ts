import { Request } from "express";
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

const mockUserService = {
        createUser: jest.fn(),
        getUser: jest.fn(),
        deleteUser: jest.fn()
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
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockResquest = {
            body: {
                name: 'Andre',
                email: 'andre@test.com',
                password: '123'
            }
        } as Request

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
            expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
        })

    it('Deve apresentar erro se o nome estiver vazio', () => {
        const mockResquest = {
            body: {
                name: '',
                email: 'andre@test.com',
                password: '123'
            }
        } as Request

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request - Nome inválido' })
    })

    it('Deve apresentar erro se o E-mail estiver vazio', () => {
        const mockResquest = {
            body: {
                name: 'André',
                email: '',
                password: '123'
            }
        } as Request

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request - E-mail inválido' })
    })

    it('Deve apresentar erro se o Password estiver vazio', () => {
        const mockResquest = {
            body: {
                name: 'Andre',
                email: 'andre@test.com',
                password: ''
            }
        } as Request

            userController.createUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request - Password inválido' })
    })


    it('Deve retornar uma lista com todos os usuários', () => {
        const mockResquest = {} as Request

            userController.getUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
    })

    it('Deve deletar o usuario da lista', () => {
        const mockResquest = {
            body: {
                name: 'André',
                email: 'andre@dio.com'
            }
        } as Request

            userController.deleteUser(mockResquest, mockResponse)
            expect(mockResponse.state.status).toBe(200)
    })
})