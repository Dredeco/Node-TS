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

        if(!user.name){
            return response.status(400).json({ message: 'Bad Request - Nome inválido' })
        }

        if(!user.email){
            return response.status(400).json({ message: 'Bad Request - E-mail inválido' })
        }

        if(!user.password){
            return response.status(400).json({ message: 'Bad Request - Password inválido' })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(200).json({ message: 'Usuário criado' })
    }

    getUser = (request: Request, response: Response) => {
        const users = this.userService.getUser()
        return response.status(200).json( users )
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        this.userService.deleteUser(user.name, user.email)
        return response.status(200).json({ message: 'Usuário excluído' })
    }
}