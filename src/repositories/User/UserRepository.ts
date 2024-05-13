import { EntityManager } from "typeorm"
import { User } from "../../entities/User";

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

    getUser = async (userId: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: userId
            }
        })
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email
            }
        })
    }
    deleteUserByEmail = async (email: string): Promise<void> => {
        this.manager.delete(User, {
            email
        })
    }
}