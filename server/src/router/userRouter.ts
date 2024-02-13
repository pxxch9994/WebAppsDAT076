// userRouter.ts
import express, { Request, Response, Router } from "express";
import { User, Pet, Post } from "../model/userModel";
import { UserService } from "../service/userService";

const userService: UserService = new UserService();
export const userRouter: Router = express.Router();

userRouter.get("/users/", async (
  req: Request<{}, {}, {}>,
  res: Response<User[] | String>
) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/users/", async (
  req: Request<{ username: string, password: string }, {}>,
  res: Response<User | string>
) => {
  try {
    const { username, password } = req.body;
    const newUser = await userService.addUser(username, password);
    res.status(201).send(newUser);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.get("/pets/", async (
  req: Request<{}, {}, {}>,
  res: Response<Pet[] | String>
) => {
  try {
    const pets = await userService.getPets();
    res.status(200).send(pets);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/pets/", async (
  req: Request<{ petName: string, userId: number, image: string, kind: string, breed: string, birthday: number }, {}>,
  res: Response<Pet | string>
) => {
  try {
    const { petName, userId, image, kind, breed, birthday } = req.body;
    const newPet = await userService.addPet(petName, userId, image, kind, breed, birthday);
    res.status(201).send(newPet);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

userRouter.post("/posts/", async (
  req: Request<{ userId: number, image: string, content: string, page: string, pet: Pet }, {}>,
  res: Response<Post | string>
) => {
  try {
    const { userId, image, content, page, pet } = req.body;
    const newPost = await userService.addPost(userId, image, content, page, pet);
    res.status(201).send(newPost);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
