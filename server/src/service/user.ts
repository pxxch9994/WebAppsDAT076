import { User } from "../model/user";

export class UserService {
    private users : User[] = [];

    async getUser(): Promise<User[]> {
        return this.users;
    }

}
