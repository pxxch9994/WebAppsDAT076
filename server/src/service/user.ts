import { User, UserWithoutPassword } from "../model/user";
import bcrypt from 'bcrypt';
import { UserModel } from "../../db/user.db";
import { DeleteResult } from "mongodb";
import { I_UserService } from "./I_UserService";
// Function to strip password from user object
function getUserWithoutPassword(user: User): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
        // @ts-ignore
    return userWithoutPassword._doc;
}
// UserService class implementing I_UserService interface
export class UserService implements I_UserService {
    private saltRounds = 10;
    // Method to get users with error handling
    public async getUsers(): Promise<User[]> {
        try {
            return await UserModel.find();
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    }

    // Method to create a user with uniqueness check, error handling, and input validation
    public createUser = async (username: string, name: string, email: string, password: string): Promise<UserWithoutPassword> => {
        if (!username || !name || !email || !password) {
            throw new Error('Username, email, and password are required');
        }
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            console.log('Database connection is ready');

            const newUser = await UserModel.create({
                username: username,
                name: name,
                email: email,
                password: hashedPassword,
            });
            return getUserWithoutPassword(newUser);
        } catch (error) {
            console.error("Error creating user", error);
            throw error;
        }
    };

    // Method for user authentication with error handling
    public async authenticate(username: string, password: string): Promise<UserWithoutPassword | null> {
        try {
            const user = await UserModel.findOne({username: username });
            if (!user) return null;

            const match = await bcrypt.compare(password, user.password);
            return match ? getUserWithoutPassword(user) : null;
        } catch (error) {
            console.error("Error authenticating user", error);
            throw error;
        }
    }

    // Method to delete a user with error handling
    public async deleteUser(username: string): Promise<boolean> {
        try {
            const result: DeleteResult = await UserModel.deleteOne({ username: username });
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting user", error);
            throw error;
        }
    }
}
