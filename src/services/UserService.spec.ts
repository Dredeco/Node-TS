import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')


describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        user_id: '123',
        name: 'André',
        email: 'andre@teste.com',
        password: '123'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('André', 'andre@teste.com', '123')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '123',
            name: 'André',
            email: 'andre@teste.com',
            password: '123'
        })
    })

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('andre@teste.com', '123')
        expect(token).toBe('token')
    })

    it('Deve retorna um erro, caso não encontre o usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError('Email/Senha inválidos')
    })
})