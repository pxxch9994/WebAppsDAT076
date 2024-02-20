import express, { Router, Request, Response } from "express";
import { PetService } from "../service/pet";
import { Pet } from "../model/pet";
import {checkAuthentication} from "./userAuthentication";

const petService : PetService = new PetService();

export const petRouter : Router = express.Router();

interface CreatePetRequest extends Request {
    params : {},
    body: {
        owner : string,
        name : string,
        image: string,
        kind : string,
        breed : string,
        birthday : number,
        status: string,
        description: string
    }
}

petRouter.get("/", async (
    req : Request<{},Pet[],{}>, res : Response<Pet[]>
) => {
    const pets : Pet[] = await petService.getPets();
    res.status(200).send(pets);
})

petRouter.get("/profile", checkAuthentication, async (
    req : Request<{},Pet[],{}>, res : Response<Pet[]>
) => {
    const pets : Pet[] = await petService.getPets();
    const result = pets.filter((p) => p.owner == req.session.username);
    res.status(200).send(result);
})

petRouter.post("/", async (
    req: CreatePetRequest , res : Response<string>
) => {
    if (typeof(req.body.owner) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- owner has type ${typeof(req.body.owner)}`);
        return;
    }
    if (typeof(req.body.name) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- name has type ${typeof(req.body.name)}`);
        return;
    }
    if (typeof(req.body.kind) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- kind has type ${typeof(req.body.kind)}`);
        return;
    }
    if (typeof(req.body.breed) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- breed has type ${typeof(req.body.breed)}`);
        return;
    }
    if (typeof(req.body.birthday) !== "number") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- birthday has type ${typeof(req.body.birthday)}`);
        return;
    }
    const owner : string = req.body.owner;
    const name : string = req.body.name;
    const image : string = req.body.image;
    const kind : string = req.body.kind;
    const breed : string = req.body.breed;
    const birthday : number = req.body.birthday;
    const status : string = req.body.status;
    const description : string = req.body.description;
    try {
        const newPet = await petService.createPet(owner, name, image, kind, breed, birthday, status, description);
        console.log('Pet created:', newPet);

        res.status(201).send("Pet created");
    } catch (error : any) {
        console.error('Error creating pet:', error.message);

        res.status(400).send("Something went wrong");
    }
})


petRouter.patch("/:id", async (
    req: Request<{ id: string }, {}, Partial<Pet>>, // Corrected type definition
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    const updates: Partial<Pet> = req.body;
    try {
        await petService.updatePetAttribute(id, updates);
        res.status(200).send("Pet changed one or more attributes");
    } catch (error : any) {
        res.status(400).send(error.message); // Handle error
    }
});

petRouter.delete("/:id", async (
    req: Request<{id: string}, {}, {}>,
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await petService.deletePet(id);
        res.status(200).send("Pet is deleted");
    } catch (error : any) {
        res.status(400).send(error.message); // Handle error
    }
});