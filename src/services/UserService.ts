const db = [
    {
        name: "André",
        email: "andre@dio.com",
    }
]

export class UserService {
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        db.push(user)
        console.log('DB Atualizado', db)
    }

    getAllUsers = () => {
        return db
    }
}