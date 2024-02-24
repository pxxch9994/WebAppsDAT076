import {User, UserWithoutPassword} from "../model/user"

export interface I_UserService {

    getUsers() : Promise<User[]>

    createUser(username: string, name: string, email: string, password: string) : Promise<UserWithoutPassword>

    authenticate(username: string, password: string): Promise<UserWithoutPassword | null>

    deleteUser(username: string): Promise<boolean>

}