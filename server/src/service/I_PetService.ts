import {Pet, PetUpdate} from "../model/pet";

export interface ITaskService {

    // Returns a deep copy of the current list of pets

    getPets() : Promise<Pet[]>

    // Creates a new pet with the given props and returns a copy of that pet object

    createPet(owner: string, ownerEmail: string, name: string, image: string, kind: string, breed: string, birthday: number, status: string, description: string) : Promise<Pet>

    updatePetAttribute(id: number, updates: Partial<PetUpdate>): Promise<boolean>

    delete(id: number): Promise<boolean>

}