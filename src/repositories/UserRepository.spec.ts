import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { User } from "../entities/User"
import { UserRepository } from "./UserRepository"

describe('UserRepository', () => {
    let userRepository: UserRepository
    let managerMock: Partial<EntityManager>

    const mockUser: User = {
        user_id: '1',
        name: 'Test user',
        email: 'test@test.com',
        password: '12345'
    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({})
        userRepository = new UserRepository(managerMock as EntityManager)
    })

    it('Deve cadastrar um novo usuário no BD', async () => {
        await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
    })
})