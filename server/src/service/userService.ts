/*import {Pet, User} from "../model/post";

export class UserService {
    
    private users : User[] = [{username: "Ebrahim", password: "123"}];
    private pets : Pet[] = [{petName: "Rosa", petId: 1233, username: "Ebrahim", image: "client/public/Lily.jpeg", kind: "cat", breed: "persian", birthday: 20211215,}];

    async getUser(): Promise<User[]> {
        return this.users;
    }



    async getPets(): Promise<Pet[]> {
        return this.pets;
    }
    
    /**
     * Adds a new user to the list of users.
     *
     * @param {string} username - The username of the new user.
     * @param {string} password - The password of the new user.
     * @returns {Promise<User>} A promise that resolves to the newly added user.
     */
    async addUser(username: string, password : string): Promise<User> {
        const user = {
            username: username,
            password: password
         }
        this.users.push(user);
        return user;
    }

    /**
     * Adds a new pet to the list of pets associated with a user.
     *
     * @param {string} petName - The name of the pet.
     * @param {string} username - The username of the user.
     * @param {string} image - The path to the image of the pet.
     * @param {string} kind - The kind or species of the pet.
     * @param {string} breed - The breed of the pet.
     * @param {number} birthday - The birthday or birthdate of the pet.
     * @returns {Promise<Pet>} A promise that resolves to the added pet.
     */
    async addPet( petName: string, username: string, image: string, kind:string, breed: string, birthday: number ): Promise<Pet> {
        const pet = {
            petName: petName,
            petId: Date.now(),
            username: username,
            image : image,
            kind: kind,
            breed: breed,
            birthday: birthday
        }
        this.pets.push(pet);
        return pet;
    }

    /**
     * Retrieves a user by their username from the list of users.
     *
     * @param {string} username - The username of the user to retrieve.
     * @returns {Promise<User | undefined>} A promise that resolves to the user if found, or undefined if not found.
     */
    async getUserByUsername(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }


}