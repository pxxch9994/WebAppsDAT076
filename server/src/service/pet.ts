import {Pet} from "../model/pet";
import { petModel } from "../db/pet.db";
import { userModel } from "../db/user.db";
import { error } from "console";

export interface PetWithoutId extends Omit<Pet, 'id'> {}
type UpdatePetInput = Omit<Pet, 'id' | 'owner'>; // prevents from changing owner or petId

export class PetService {
    // Returns the current list of pets
    async getPets() : Promise<Pet[]> {
       try {
        const pets = await petModel.find();
        return pets.map(pet => pet.toObject());
       } catch {
        console.error("Failed to get all pets");
        throw error;
       }
    }

    // Create a pet with a given attributes
    // Returns the created pet
    async createPet(owner: string, name: string, kind: string, breed: string, birthday: number) : Promise<PetWithoutId> {
        try {
            //Check if owner exists
            const exisitingOwner = await userModel.findOne({ username: owner });
            if (!exisitingOwner){
                throw new Error('Owner not found')
            }

            //Create new pet in database
            const newPet = await petModel.create({
                owner,
                name,
                kind,
                breed,
                birthday,
            });

            return newPet.toObject();
        } catch (error){
            console.error("Failed creating a new pet");
            throw error; 
        }
    }
    
    async updatePetAttribute(id: number, updates: UpdatePetInput): Promise<void> {
        try{
            const updatedPet = await petModel.findByIdAndUpdate(
                id, 
                {$set: updates},
                {new: true}
            ); 
            
            if (!updatedPet) {
                throw new Error('Pet not found');
            }
        } catch (error) {
            console.error("Failed updating pet attributes");
            throw error; 
        }
    }

    async deletePet(id: number): Promise<void> {
        try {
            const deletedPet = await petModel.findByIdAndDelete(id);

            if (!deletedPet){
                throw new Error('Pet not found');
            }
        } catch (error){
            throw error;
        }
    }
}