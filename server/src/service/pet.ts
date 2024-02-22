import { Pet } from "../model/pet";
import { petModel } from "../db/pet.db";
import { userModel } from "../db/user.db";

export interface PetWithoutId extends Omit<Pet, 'id'> {}
export type UpdatePetInput = Omit<Pet, 'id' | 'owner'> & { ownerEmail?: string };

export class PetService {
    // Returns the current list of pets
    async getPets() : Promise<Pet[]> {
        try {
            const pets = await petModel.find();
            return pets.map((pet: { toObject: () => any; }) => pet.toObject());
        } catch (error) {
            console.error("Failed to get all pets");
            throw error;
        }
    }

    // Create a pet with given attributes
    // Returns the created pet
    async createPet(ownerEmail: string, name: string, kind: string, breed: string, birthday: number): Promise<PetWithoutId> {
        try {
            // Check if owner email exists
            const existingOwner = await userModel.findOne({ email: ownerEmail });
            if (!existingOwner) {
                throw new Error('Owner not found');
            }

            // Create new pet in the database
            const newPet = await petModel.create({
                owner: existingOwner.username, // Assuming username is used as owner in Pet model
                ownerEmail, // Keep ownerEmail in the pet document
                name,
                kind,
                breed,
                birthday,
            });

            return newPet.toObject();
        } catch (error) {
            console.error("Failed creating a new pet");
            throw error; 
        }
    }

    async updatePetAttribute(id: number, updates: UpdatePetInput): Promise<void> {
        try {
            const updatedPet = await petModel.findByIdAndUpdate(
                id,
                { $set: updates },
                { new: true }
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

            if (!deletedPet) {
                throw new Error('Pet not found');
            }
        } catch (error) {
            throw error;
        }
    }
}
