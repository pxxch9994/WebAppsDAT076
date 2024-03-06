import {User, UserWithoutPassword} from "../model/user"

// Interface for UserService
export interface I_UserService {
    // Method to get users
    getUsers() : Promise<User[]>
    // Method to create a user
    createUser(username: string, name: string, email: string, password: string) : Promise<UserWithoutPassword>
    // Method to authenticate a user
    authenticate(username: string, password: string): Promise<UserWithoutPassword | null>
    // Method to delete a user
    deleteUser(username: string): Promise<boolean>

}