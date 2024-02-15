import { PetService } from "../service/pet";

describe("PetService", () => {
  let petService: PetService;

  beforeEach(() => {
    // Initialize a new instance of PetService before each test
    petService = new PetService();
  });

  it("should return an empty array when no pets are added", async () => {
    const pets = await petService.getPets();
    expect(pets).toEqual([]);
  });

  it("should create a new pet and return the created pet", async () => {
    const newPet = await petService.createPet("John", "Buddy", "Dog", "Golden Retriever", 1672531200000); // Assuming a specific birthday timestamp

    // Check if the created pet has the correct attributes
    expect(newPet.owner).toBe("John");
    expect(newPet.name).toBe("Buddy");
    expect(newPet.kind).toBe("Dog");
    expect(newPet.breed).toBe("Golden Retriever");

    // Check if the pet is added to the list
    const pets = await petService.getPets();
    expect(pets).toHaveLength(1);
    expect(pets[0]).toEqual(newPet);
  });

  it("should update the attributes of an existing pet", async () => {
    const newPet = await petService.createPet("Jane", "Fluffy", "Cat", "Persian", 1672531200000);
    const petId = newPet.id;

    // Update the pet's name
    await petService.updatePetAttribute(petId, { name: "Whiskers" });

    // Retrieve the updated pet
    const updatedPet = (await petService.getPets())[0];

    // Check if the name is updated
    expect(updatedPet.name).toBe("Whiskers");
  });

  it("should delete an existing pet", async () => {
    const newPet = await petService.createPet("Bob", "Fido", "Dog", "Labrador", 1672531200000);
    const petId = newPet.id;

    // Delete the pet
    await petService.deletePet(petId);

    // Check if the pet is removed from the list
    const pets = await petService.getPets();
    expect(pets).toEqual([]);
  });

  it("should reject updating a non-existing pet", async () => {
    const nonExistingPetId = 12345;

    // Attempt to update a non-existing pet
    await expect(petService.updatePetAttribute(nonExistingPetId, { name: "NewName" })).rejects.toThrowError("Pet not found");
  });

  it("should reject deleting a non-existing pet", async () => {
    const nonExistingPetId = 12345;

    // Attempt to delete a non-existing pet
    await expect(petService.deletePet(nonExistingPetId)).rejects.toThrowError("Pet not found");
  });
});
