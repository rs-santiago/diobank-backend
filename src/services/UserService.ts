import { sign } from "jsonwebtoken";
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

    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {

        return this.userRepository.getUserByEmailAndPassword(email, password)
    }

    deleteUserByEmail = (email: string) => {
        return this.userRepository.deleteUserByEmail(email)
    }

    getToken = async (email: string, password: string): Promise<string> => {
        const user = await this.getAuthenticatedUser(email, password)

        if (!user) {
            throw new Error('Email/Password inválido!')
        }

        const tokenData = {
            name: user.name,
            email: user.email
        }

        const tokenOptions = {
            subject: user.name
        }

        const token = sign(tokenData, process.env.JWT_SECRET, tokenOptions)

        return token
    }
}

