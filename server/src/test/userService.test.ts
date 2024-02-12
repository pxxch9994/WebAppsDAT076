import { UserService } from "../service/userService";

const userService = new UserService();

// getUser method
test("getUser should return an array of users", async () => {
  const users = await userService.getUser();
  expect(Array.isArray(users)).toBeTruthy();
});

// getPets method
test("getPets should return an array of pets", async () => {
  const pets = await userService.getPets();
  expect(Array.isArray(pets)).toBeTruthy();
});

// addUser method
test("addUser should add a new user", async () => {
  const userName = "John Doe";
  const newUser = await userService.addUser(userName);

  expect(newUser).toBeDefined();
  expect(newUser.name).toBe(userName);
});

// Test case for addPet method
test("addPet should add a new pet", async () => {
  const petName = "Fluffy";
  const petDate = 19991231;
  const petType = "Dog";
  const petBreed = "Golden Retriever";
  const ownerId = 111; 

  const newPet = await userService.addPet(petName, petDate, petType, petBreed, ownerId);

  expect(newPet).toBeDefined();
  expect(newPet.name).toBe(petName);
  expect(newPet.birthday).toBe(petDate);
  expect(newPet.type).toBe(petType);
  expect(newPet.breed).toBe(petBreed);
  expect(newPet.ownerId).toBe(ownerId);
});
