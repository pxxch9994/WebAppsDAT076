import { PetService } from "../service/pet";
import { PetModel } from "../../db/pet.db";

const PetModelMock = PetModel as any;
// Mocking the PetModel for testing purposes
jest.mock('../../db/pet.db');

// Testing suite for PetService class
describe('PetService', () => {
  let petService: PetService;
  // Before each test, initialize a new instance of PetService
  beforeEach(() => {
    petService = new PetService();
  });
  // Test case for getPets method when no pets are added
  it('should return an empty array when no pets are added', async () => {
    PetModelMock.find.mockResolvedValue([]);
    const pets = await petService.getPets();
    expect(pets).toEqual([]);
  });
  // Test case for getProfilePets method to return pets for a given owner
  it('should return an array of pets for a given owner', async () => {
    const owner = 'John';
    PetModelMock.find.mockResolvedValue([{owner: 'John', name: 'Buddy'}]);

    const ownerPets = await petService.getProfilePets(owner);
    expect(ownerPets).toEqual([{owner: 'John', name: 'Buddy'}]);
  });
  // Test case for createPet method to create a new pet
  it('should create a new pet and return the created pet', async () => {
    const newPetData = {
      owner: 'John',
      ownerEmail: 'john@example.com',
      name: 'Buddy',
      image: 'img.jpg',
      kind: 'Dog',
      breed: 'Golden Retriever',
      birthday: 230101,
      status: 'missing',
      description: 'hej',
    };
    PetModelMock.create.mockResolvedValue(newPetData);

    const newPet = await petService.createPet(
        newPetData.owner,
        newPetData.ownerEmail,
        newPetData.name,
        newPetData.image,
        newPetData.kind,
        newPetData.breed,
        newPetData.birthday,
        newPetData.status,
        newPetData.description,
    );

    expect(newPet).toEqual(newPetData);
  });
  // Test case for updatePetAttribute method to update attributes of an existing pet
  it('should update the attributes of an existing pet', async () => {
    const existingPetId = 123;
    const updates = {name: 'Whiskers'};
    PetModelMock.updateMany.mockResolvedValue({matchedCount: 1}); // Update to updateMany
    const result = await petService.updatePetAttribute(existingPetId, updates);
    expect(result).toBe(true);
  });
  // Test case for delete method to delete an existing pet
  it('should delete an existing pet', async () => {
    const existingPetId = 123;
    PetModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const result = await petService.delete(existingPetId);
    expect(result).toBe(true);
  });
  // Test case for deleteByOwner method to delete pets by owner
  it('should delete pets by owner', async () => {
    const owner = 'John';
    PetModelMock.deleteMany.mockResolvedValue({ deletedCount: 2 }); // Assuming two pets were deleted
    const result = await petService.deleteByOwner(owner);
    expect(result).toBe(true);
  });
  // Test case for deleteByOwner method when no pets are found for the specified owner
  it('should return false if no pets are found for the specified owner', async () => {
    const nonExistingOwner = 'NonExistentOwner';
    PetModelMock.deleteMany.mockResolvedValue({ deletedCount: 0 });

    const result = await petService.deleteByOwner(nonExistingOwner);
    expect(result).toBe(false);
  });


});



