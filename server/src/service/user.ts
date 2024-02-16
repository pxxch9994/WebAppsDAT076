import {User} from "../model/user";
import bcrypt from 'bcrypt';
import { userModel } from "../db/user.db";
import { error } from "console";


// Use the Omit utility type to create a type without the password
type UserWithoutPassword = Omit<User, 'password'>;

function getUserWithoutPassword(user: User): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


export class UserService {
    private saltRounds = 10;


    async getUserByUsername(username: string): Promise<User | null> {
        try{
            const user = await userModel.findOne({ username });
            return user ? user.toObject() : null;
        } catch (error){
            console.error("Failed to find user");
            throw error;
        }
        
    }

    // Returns the current list of users
    async getUsers(): Promise<User[]> {
        //TODO fix so we don't return a user object with password here
        try {
            const users = await userModel.find();
            return users.map(user => user.toObject());
        } catch (error) {
            throw error;
        }
    }



    // Create a user with a given name and add it to the user list
    // Returns the created user
    async createUser(username: string, name:string, password:string): Promise<UserWithoutPassword>{
        try {
            //Check if the username is already taken
            const exisitingUser = await userModel.findOne({ username });
            if (exisitingUser){
                throw new Error ('Username is already taken');
            }

            //Hash password
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);

            //Create new user in the database
            const newUser = await userModel.create({
                username, 
                name,
                password: hashedPassword,
            });

            return getUserWithoutPassword(newUser.toObject());
        } catch {
            console.error("Failed to create new user");
            throw error; 
        }
    }

    async changeName(username:string, name:string): Promise<void> {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                {username},
                {$set: {name}},
                {new: true} //Returns value of modified document
            );

            if(!updatedUser){
                throw new Error('User not found')
            }
        } catch {
            throw error;
        }
    }

    async authenticate(username:string, password:string): Promise<UserWithoutPassword | null>{
        try {
            const user = await userModel.findOne({ username });
            if (user) {
                //compare password with stored hashed password
                const match = await bcrypt.compare(password, user.password);
                if (match){
                    return getUserWithoutPassword(user.toObject());
                }
            }
            return null; 
        } catch {
            console.error("Authentication failed");
            throw error;
        }
    }

    async deleteUser(username:string): Promise<void> {
        try {
            const deletedUser = await userModel.findOneAndDelete({ username });

            if (!deletedUser){
                throw new Error('User not found');
            }
        } catch {
            console.error("Failed deleting a user");
            throw error;    
        }
    }
}

