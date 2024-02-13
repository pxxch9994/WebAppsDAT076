// petRouter.ts

import express, { Request, Response, Router } from "express";
import { Pet } from "../model/userModel";
import { UserService } from "../service/userService";

const userService: UserService = new UserService();
export const petRouter: Router = express.Router();

petRouter.get("/pets/", async (
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

petRouter.post("/pets/", async (
  req: Request<{ petName: string, userId: number, image: string, kind: string, breed: string, birthday: number }, {}>,
  res: Response<Pet | string>
) => {
  try {
    const petName = req.body.petName;
    const userId = req.body.userId;
    const image = req.body.image;
    const kind = req.body.kind;
    const breed = req.body.breed;
    const birthday = req.body.birthday;

    if (typeof (petName) !== "string" || typeof (userId) !== "number" || typeof (image) !== "string" ||
      typeof (kind) !== "string" || typeof (breed) !== "string" || typeof (birthday) !== "number") {
      res.status(400).send(`Bad POST call to ${req.originalUrl} --- Invalid request body`);
      return;
    }

    const newPet = await userService.addPet(petName, userId, image, kind, breed, birthday);
    res.status(201).send(newPet);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
