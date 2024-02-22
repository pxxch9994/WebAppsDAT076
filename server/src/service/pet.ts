import {Pet} from "../model/pet";

export class PetService {
    private pets : Pet[] = [];

    // Returns the current list of pets
    async getPets() : Promise<Pet[]> {
        return JSON.parse(JSON.stringify(this.pets));
    }

    // Create a pet with a given attributes
    // Returns the created pet
    async createPet(owner: string, name: string, kind: string, breed: string, birthday: number, status:string,description:string) : Promise<Pet> {

        let newPet : Pet = {
            owner : owner,
            name : name,
            id : Date.now(),
            image : "TODO", // TODO
            kind : kind,
            breed : breed,
            birthday : birthday,
            status : status,
            description:description
        }

        this.pets.push(newPet);
        return JSON.parse(JSON.stringify(newPet));
    }


    async updatePetAttribute(id: number, updates: Partial<Pet>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const pet: Pet | undefined = this.pets.find((t: Pet) => t.id === id);
            if (pet === undefined) {
                // Reject the promise with an error
                reject(new Error('Pet not found'));
            } else {
                Object.assign(pet, updates);
                // Resolve the promise when the name is successfully changed
                resolve();
            }
        });
    }

    async deletePet(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const pet: Pet | undefined = this.pets.find((t: Pet) => t.id === id);
            if(pet === undefined) {
                reject(new Error('Pet not found'))
            } else {
                this.pets.splice(this.pets.indexOf(pet), 1)
                resolve();
            }
        });
    }
}