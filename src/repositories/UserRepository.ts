import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager;
    }

    createUser = async (user: User) => {
        return this.manager.save(user)
    }

    getUser = async (userID: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                user_id: userID
            }
        })
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email,
                password
            }
        })
    }
}