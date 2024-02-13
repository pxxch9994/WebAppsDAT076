// userService.ts
import { Pet, User, Post } from "../model/userModel";

export class UserService {
  private users: User[] = [];
  private pets: Pet[] = [];
  private posts: Post[] = [];

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getPets(): Promise<Pet[]> {
    return this.pets;
  }

  async addUser(username: string, password: string): Promise<User> {
    const user: User = {
      userId: Date.now(),
      username: username,
      password: password
    };

    this.users.push(user);
    return user;
  }

  async addPet(petName: string, userId: number, image: string, kind: string, breed: string, birthday: number): Promise<Pet> {
    const pet: Pet = {
      petId: Date.now(),
      petName: petName,
      userId: userId,
      image: image,
      kind: kind,
      breed: breed,
      birthday: birthday
    };

    this.pets.push(pet);
    return pet;
  }

  async addPost(userId: number, image: string, content: string, page: string, pet: Pet): Promise<Post> {
    const post: Post = {
      postId: Date.now(),
      userId: userId,
      image: image,
      content: content,
      page: page,
      pet: pet
    };

    this.posts.push(post);
    return post;
  }
}
