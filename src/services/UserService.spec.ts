import { UserService } from "./UserService"

jest.mock('../repositories/UserRepository')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            user_id: '123',
            name: 'André',
            email: 'andre@teste.com',
            password: '123'
        }))
        const response = await userService.createUser('André', 'andre@teste.com', '123')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '123',
            name: 'André',
            email: 'andre@teste.com',
            password: '123'
        })
    })
})