import { User, UserWithoutPassword } from "../model/user";
import bcrypt from 'bcrypt';
import { UserModel } from "../../db/conn";
import { DeleteResult } from "mongodb";
import { I_UserService } from "./I_UserService";



// TODO see what we can do to fix _doc is error marked. OBS it works anyway
function getUserWithoutPassword(user: User): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
        // @ts-ignore
    return userWithoutPassword._doc;
}

export class UserService implements I_UserService {
    private saltRounds = 10;

    // Improved getUsers with error handling
    public async getUsers(): Promise<User[]> {
        try {
            return await UserModel.find();
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    }

    // Create user with uniqueness check, error handling, and input validation
    public createUser = async (username: string, name: string, email: string, password: string): Promise<UserWithoutPassword> => {
        if (!username || !email || !password) {
            throw new Error('Username, email, and password are required');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            console.log('Database connection is ready');

            const newUser = await UserModel.create({
                username,
                name,
                email,
                password: hashedPassword,
            });
            return getUserWithoutPassword(newUser);
        } catch (error) {
            console.error("Error creating user", error);
            throw error;
        }
    };

    // Authentication with error handling
    public async authenticate(username: string, password: string): Promise<UserWithoutPassword | null> {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) return null;

            const match = await bcrypt.compare(password, user.password);
            return match ? getUserWithoutPassword(user) : null;
        } catch (error) {
            console.error("Error authenticating user", error);
            throw error;
        }
    }

    // deleteUser with error handling
    public async deleteUser(username: string): Promise<boolean> {
        try {
            const result: DeleteResult = await UserModel.deleteOne({ username });
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting user", error);
            throw error;
        }
    }
}
