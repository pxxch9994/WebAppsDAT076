import {Pet, PetUpdate} from "../model/pet";
// Interface for PetService
export interface ITaskService {
    // Method to get all pets
    // Returns an array of pet
    getPets() : Promise<Pet[]>
    // Method to create a new pet
    // Returns the created pet object
    createPet(owner: string, ownerEmail: string, name: string, image: string, kind: string, breed: string, birthday: number, status: string, description: string) : Promise<Pet>
    // Method to update attributes of a pet
    // Returns a boolean indicating success or failure
    updatePetAttribute(id: number, updates: Partial<PetUpdate>): Promise<boolean>
    // Method to delete a pet by its ID
    // Returns a boolean indicating success or failure
    delete(id: number): Promise<boolean>

}