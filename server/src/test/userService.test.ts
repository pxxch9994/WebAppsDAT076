import { UserService } from "../service/user";
import { UserModel } from "../../db/user.db";
import bcrypt from 'bcrypt';
// Mocking the UserModel for testing purposes
jest.mock('../../db/user.db', () => {
  const mockUserModel = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  return { UserModel: mockUserModel };
});

// Mocking the bcrypt module for testing purposes
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Testing suite for UserService class
describe('UserService', () => {
  let userService: UserService;
  // Before each test, initialize a new instance of UserService
  beforeEach(() => {
    userService = new UserService();
  });
  // After each test, clear all mock calls
  afterEach(() => {
    jest.clearAllMocks();
  });
  // Test case for getUsers method
  it('should get users', async () => {
    const mockUsers = [{ username: 'user1', name: 'User 1', email: 'user1@example.com' }];
    (UserModel.find as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userService.getUsers();

    expect(UserModel.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });
  // Test case for createUser method
  it('should create a user', async () => {
    const mockUser = { username: 'newUser', name: 'New User', email: 'newuser@example.com' };
    const hashedPassword = 'hashedPassword';
    // Set up mocks for bcrypt.hash and UserModel.create
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
    // Call the method
    const result = await userService.createUser('newUser', 'New User', 'newuser@example.com', 'password123');
  
    // Assert
    //expect(result).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', expect.any(Number));
    expect(UserModel.create).toHaveBeenCalledWith({
      username: 'newUser',
      name: 'New User',
      email: 'newuser@example.com',
      password: hashedPassword,
    }); // Ensure UserModel.create was called with the correct parameters
  });

  // Test case for authenticate method
  it('should authenticate a user', async () => {
    const mockUser = { username: 'authUser', name: 'Authenticated User', email: 'authuser@example.com', password: 'hashedPassword' };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    
    const result = await userService.authenticate('authUser', 'password123');
    console.log('mockUser:', mockUser);
    console.log('UserModel.findOne.mock.calls:', (UserModel.findOne as jest.Mock).mock.calls);
    console.log('result:', result);
    
    expect(UserModel.findOne).toHaveBeenCalledWith({ username: 'authUser' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
  });
  // Test case for deleteUser method
  it('should delete a user', async () => {
    const usernameToDelete = 'userToDelete';
    const deleteResult = { deletedCount: 1 };
    (UserModel.deleteOne as jest.Mock).mockResolvedValue(deleteResult);

    const result = await userService.deleteUser(usernameToDelete);
    // Ensure UserModel.deleteOne was called once
    expect(UserModel.deleteOne).toHaveBeenCalledTimes(1);
    // Ensure UserModel.deleteOne was called with the correct parameters
    expect(UserModel.deleteOne).toHaveBeenCalledWith({ username: usernameToDelete });
    expect(result).toBe(true); // Ensure result is true indicating successful deletion
  });
});
