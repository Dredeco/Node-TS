import { User, UserService } from "./UserService"


describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('André', 'andre@teste.com')
        expect(mockConsole).toHaveBeenCalledWith('DB Atualizado', mockDb)
    })
})