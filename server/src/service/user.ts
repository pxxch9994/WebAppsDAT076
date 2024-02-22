import { User } from "../model/user";
import bcrypt from 'bcrypt';
import { userModel } from "../db/user.db";
import { error } from "console";

type UserWithEmail = User & { email: string };

export class UserService {
    private saltRounds = 10;

    async getUserByUsername(username: string): Promise<User | null> {
        try {
            const user = await userModel.findOne({ username });

            if (user) {
                const userObject = user.toObject();
                return { ...userObject, password: userObject.password || undefined } as UserWithEmail;
            }

            return null;
        } catch (error) {
            console.error("Failed to find user");
            throw error;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            const users = await userModel.find();
            return users.map(user => user.toObject() as User);
        } catch (error) {
            throw error;
        }
    }

    async createUser(username: string, name: string, email: string, password: string): Promise<User> {
        try {
            const existingUser = await userModel.findOne({ username });
            if (existingUser) {
                throw new Error('Username is already taken');
            }

            const hashedPassword = await bcrypt.hash(password, this.saltRounds);

            const newUser = await userModel.create({
                username,
                name,
                email,
                password: hashedPassword,
            });

            return newUser.toObject() as User;
        } catch (error) {
            console.error("Failed to create new user");
            throw error;
        }
    }

    async updateUser(username: string, updatedData: Partial<User>): Promise<void> {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { username },
                { $set: updatedData },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Failed to update user");
            throw error;
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        try {
            const user = await userModel.findOne({ username });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return user.toObject() as User;
                }
            }
            return null;
        } catch (error) {
            console.error("Authentication failed");
            throw error;
        }
    }

    async deleteUser(username: string): Promise<void> {
        try {
            const deletedUser = await userModel.findOneAndDelete({ username });

            if (!deletedUser) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Failed deleting a user");
            throw error;
        }
    }
}