import {User} from "../model/user";
import bcrypt from 'bcrypt';


// Use the Omit utility type to create a type without the password
type UserWithoutPassword = Omit<User, 'password'>;

function getUserWithoutPassword(user: User): UserWithoutPassword {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


export class UserService {
    private users : User[] = [];
    private saltRounds = 10;


    public getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username);
    }

    // Returns the current list of users
    async getUsers() : Promise<User[]> {
        return JSON.parse(JSON.stringify(this.users)); //TODO fix so we don't return a user object with password here
    }



    // Create a user with a given name and add it to the user list
    // Returns the created user
    async createUser(username : string, name : string, password : string) : Promise<UserWithoutPassword> {
        // Check if the username is already taken
        if (this.users.some(user => user.username === username)) {
            return Promise.reject(new Error('Username is already taken'));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        let newUser : User = {
            username: username,
            name: name,
            password: hashedPassword
        }

        this.users.push(newUser);

        return getUserWithoutPassword(newUser); // TODO check if its okay to not make a deep copy here
        //return JSON.parse(JSON.stringify(newUser));
    }

    async changeName(username: string, name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const user: User | undefined = this.users.find((t: User) => t.username === username);
            if (user === undefined) {
                // Reject the promise with an error
                reject(new Error('User not found'));
            } else {
                user.name = name;
                // Resolve the promise when the name is successfully changed
                resolve();
            }
        });
    }

    async authenticate(username: string, password: string): Promise<UserWithoutPassword | null> {
        const user = this.users.find(user => user.username === username);
        if (user) {
            // Compare submitted password with the stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Passwords match
                return getUserWithoutPassword(user); // For security, consider omitting password in the returned value
            }
        }
        // Authentication failed
        return null;
    }

    async deleteUser(username: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const user: User | undefined = this.users.find((t: User) => t.username === username);
            if(user === undefined) {
                reject(new Error('User not found'))
            } else {
                this.users.splice(this.users.indexOf(user), 1)
                resolve();
            }
        });
    }
}

