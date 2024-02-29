import { PetService } from "../service/pet";
import { PetModel } from "../../db/pet.db";

const PetModelMock = PetModel as any;

jest.mock('../../db/pet.db');

describe('PetService', () => {
  let petService: PetService;

  beforeEach(() => {
    petService = new PetService();
  });

  it('should return an empty array when no pets are added', async () => {
    PetModelMock.find.mockResolvedValue([]);

    const pets = await petService.getPets();
    expect(pets).toEqual([]);
  });

  it('should return an array of pets for a given owner', async () => {
    const owner = 'John';
    PetModelMock.find.mockResolvedValue([{ owner: 'John', name: 'Buddy' }]);

    const ownerPets = await petService.getProfilePets(owner);
    expect(ownerPets).toEqual([{ owner: 'John', name: 'Buddy' }]);
  });

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

  it('should update the attributes of an existing pet', async () => {
    const existingPetId = 123;
    const updates = { name: 'Whiskers' };
    PetModelMock.updateOne.mockResolvedValue({ matchedCount: 1 });

    const result = await petService.updatePetAttribute(existingPetId, updates);
    expect(result).toBe(true);
  });

  it('should delete an existing pet', async () => {
    const existingPetId = 123;
    PetModelMock.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await petService.delete(existingPetId);
    expect(result).toBe(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
