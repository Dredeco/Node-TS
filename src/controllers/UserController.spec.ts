import { Request } from "express";
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockResquest = {
            body: {
                name: 'André',
                email: 'andre@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockResquest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })
})