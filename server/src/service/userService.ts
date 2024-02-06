import {Pet, User} from "../model/userModel";

export class UserService {
    private users : User[] = [{id: 123, name:"Ebrahim"}];
    private pets : Pet[] = [{name: "Rosa", petId: 1233, birthday: 970801, type: "drake", breed: "taggsvans", ownerId: 123}];

    async getUser(): Promise<User[]> {
        return this.users;
    }

    async getPets(): Promise<Pet[]> {
        return this.pets;
    }

    async addUser(name: string): Promise<User> {
        const user = {
            id: Date.now(),
            name: name
         }
        this.users.push(user);
        return user;
    }

    async addPet(name: string, date: number, type:string, breed:string, ownerId:number): Promise<Pet> {
        const pet = {
            name: name,
            petId: Date.now(),
            birthday: date,
            type: type,
            breed: breed,
            ownerId: ownerId
        }
        this.pets.push(pet);
        return pet;
    }


}