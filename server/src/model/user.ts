export interface User {
    username : string;
    name: string;
    email: string;
    password: string;
}

// Omit utility type to create a type without the password
export type UserWithoutPassword = Omit<User, 'password'>;
