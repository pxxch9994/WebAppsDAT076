import {Pet, User} from "../model/userModel";

export class UserService {
    
    private users : User[] = [{username: "Ebrahim", password: "123"}];
    private pets : Pet[] = [{petName: "Rosa", petId: 1233, username: "Ebrahim", image: "client/public/Lily.jpeg", kind: "cat", breed: "persian", birthday: 20211215,}];

    async getUser(): Promise<User[]> {
        return this.users;
    }

    async getPets(): Promise<Pet[]> {
        return this.pets;
    }

    async addUser(username: string, password : string): Promise<User> {
        const user = {
            username: username,
            password: password
         }
        this.users.push(user);
        return user;
    }

    // TODO: check existing ownerID and unique petID using a helper function.
    /**
     * Add a pet to an existing user. All petID's are unique.
     * @param petName Name of pet.
     * @param username Owner of pet.
     * @param image Picture of pet.
     * @param kind Animal kind.
     * @param breed Breed of pet.
     * @param birthday Birthday of pet.
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


}