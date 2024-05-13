import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/User/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository
    }

    createUser = (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password)

        return this.userRepository.createUser(user)
    }

    getUser = (userId: string): Promise<User | null> => {

        return this.userRepository.getUser(userId)
    }

    getUserByEmail = (userId: string): Promise<User | null> => {

        return this.userRepository.getUserByEmail(userId)
    }

    deleteUserByEmail = (email: string) => {
        return this.userRepository.deleteUserByEmail(email)
    }
}

