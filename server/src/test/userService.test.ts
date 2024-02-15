import { UserService } from "../service/user";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    // Initialize a new instance of UserService before each test
    userService = new UserService();
  });

  it("should return an empty array when no users are added", async () => {
    const users = await userService.getUsers();
    expect(users).toEqual([]);
  });

  it("should create a new user and return the created user without password", async () => {
    const newUser = await userService.createUser("testUser", "Test Name", "password123");

    // Check if the created user has the correct attributes
    expect(newUser.username).toBe("testUser");
    expect(newUser.name).toBe("Test Name");

    // Check if the user is added to the list
    const users = await userService.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(expect.objectContaining({ username: "testUser", name: "Test Name" }));
    expect('password' in newUser).toBeFalsy(); // Ensure the password is not present
  });

  it("should reject creating a user with an existing username", async () => {
    await userService.createUser("existingUser", "Existing User", "password123");

    // Attempt to create a user with the same username
    await expect(userService.createUser("existingUser", "Another User", "password456")).rejects.toThrowError("Username is already taken");
  });

  it("should update the name of an existing user", async () => {
    await userService.createUser("userToUpdate", "Original Name", "password123");
    const username = "userToUpdate";

    // Update the user's name
    await userService.changeName(username, "Updated Name");

    // Retrieve the updated user
    const updatedUser = (await userService.getUsers())[0];

    // Check if the name is updated
    expect(updatedUser.name).toBe("Updated Name");
  });

  it("should reject updating the name of a non-existing user", async () => {
    const nonExistingUsername = "nonExistingUser";

    // Attempt to update the name of a non-existing user
    await expect(userService.changeName(nonExistingUsername, "New Name")).rejects.toThrowError("User not found");
  });

  it("should authenticate a user with correct username and password", async () => {
    await userService.createUser("authUser", "Authenticated User", "password123");
    const username = "authUser";
    const password = "password123";

    // Authenticate the user
    const authenticatedUser = await userService.authenticate(username, password);

    // Check if authentication is successful and password is omitted
    expect(authenticatedUser).toEqual(expect.objectContaining({
      username: "authUser",
      name: "Authenticated User",
    }));

    // Ensure that password is not present in the returned user
    expect('password' in authenticatedUser!).toBeFalsy();
  });

  it("should not authenticate a user with incorrect password", async () => {
    await userService.createUser("authUser", "Authenticated User", "password123");
    const username = "authUser";
    const incorrectPassword = "wrongPassword";

    // Attempt to authenticate the user with incorrect password
    const authenticatedUser = await userService.authenticate(username, incorrectPassword);

    // Check if authentication fails and null is returned
    expect(authenticatedUser).toBeNull();
  });

  it("should delete an existing user", async () => {
    await userService.createUser("userToDelete", "User to Delete", "password123");
    const username = "userToDelete";

    // Delete the user
    await userService.deleteUser(username);

    // Check if the user is removed from the list
    const users = await userService.getUsers();
    expect(users).toEqual([]);
  });

  it("should reject deleting a non-existing user", async () => {
    const nonExistingUsername = "nonExistingUser";

    // Attempt to delete a non-existing user
    await expect(userService.deleteUser(nonExistingUsername)).rejects.toThrowError("User not found");
  });
});
