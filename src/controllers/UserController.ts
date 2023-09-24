import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
        ){
            this.userService = userService
        }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if(!user.name || !user.email || !user.password){
            return response.status(400).json({ message: 'Bad Request - Todos os campos são obrigatórios' })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(200).json({ message: 'Usuário criado' })
    }

    getUser = async (request: Request, response: Response) => {
        const { userID } = request.params
        const user = await this.userService.getUser(userID)
        return response.status(200).json({
            userID: user?.user_id,
            name: user?.name,
            email: user?.email
        })
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        this.userService.deleteUser(user.name, user.email)
        return response.status(200).json({ message: 'Usuário excluído' })
    }
}