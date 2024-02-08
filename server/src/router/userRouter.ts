import express, { Request, Response, Router } from "express";
import { User, Pet } from "../model/userModel";
import { UserService } from "../service/userService";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

userRouter.get("/users/", async (
    req : Request<{}, {} ,{}>,
    res : Response<User[] | String>
) => {
    try {
        const users = await userService.getUser();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.get("/pets/", async (
    req : Request<{}, {} ,{}>,
    res : Response<Pet[] | String>
) => {
    try {
        const pets = await userService.getPets();
        res.status(200).send(pets);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/users/", async (
    req: Request<{ name : string }, {} >,
    res: Response<User | string>
) => {
    try {
        const name = req.body.name;
        if (typeof(name) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(name)}`);
            return;
        }
        const newUser = await userService.addUser(name);
        res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

userRouter.post("/pets/", async (
    req: Request<{ name : string, date: number, type:string,  breed:string, ownerId:number}, {} >,
    res: Response<Pet | string>
) => {
    try {
        const name = req.body.name;
        const date = req.body.date;
        const type = req.body.type;
        const breed = req.body.breed;
        const ownerId= req.body.ownerId;
        if (typeof(name) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(name)}`);
            return;
        }
        if (typeof(date) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(date)}`);
            return;
        }
        if (typeof(type) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(type)}`);
            return;
        }
        if (typeof(breed) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(breed)}`);
            return;
        }
        if (typeof(ownerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(ownerId)}`);
            return;
        }
        const newPet = await userService.addPet(name, date, type, breed, ownerId);
        res.status(201).send(newPet);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})
