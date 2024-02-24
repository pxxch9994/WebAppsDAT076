import {Pet, PetUpdate} from "../model/pet";
import {ITaskService} from "./I_PetService";
import {PetModel, UserModel} from "../../db/conn";
import {DeleteResult} from "mongodb";

export class PetService implements ITaskService {

    private pets : Pet[] = [];

    // Returns the current list of pets
    async getPets() : Promise<Pet[]> {
        try {
            return await PetModel.find();
        } catch (error) {
            console.error("Error fetching pets", error);
            throw error;
        }
    }

    // Returns the current list of pets
    async getProfilePets(owner: string) : Promise<Pet[]> {
        try {
            return PetModel.find({owner});
        } catch (error) {
            console.error("Error fetching users", error);
            throw error;
        }
    }

    // Create a pet with a given attributes
    // Returns the created pet
    async createPet(owner: string, ownerEmail: string, name: string, image: string, kind: string, breed: string, birthday: number, status: string, description: string) : Promise<Pet> {
        try {
            return await PetModel.create({
                owner: owner,
                ownerEmail: ownerEmail,
                name: name,
                id: Date.now().valueOf(),
                image: image,
                kind: kind,
                breed: breed,
                birthday: birthday,
                status: status,
                description: description
            });
        } catch (error) {
            console.error("Error creating pet pet", error);
            throw error;
        }
    }

    async updatePetAttribute(id: number, updates: Partial<PetUpdate>): Promise<boolean> {
        try {
            const result = await PetModel.updateOne(
                {id: id},
                {$set: updates}
            );
            return (result.matchedCount == 1);
        } catch (error) {
                console.error("Error creating pet pet", error);
                throw error;
            }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const result: DeleteResult = await PetModel.deleteOne(
                {id: id},
            );
            return (result.deletedCount == 1);
        } catch (error) {
            console.error("Error creating pet pet", error);
            throw error;
        }
    }
}