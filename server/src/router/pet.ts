import express, { Router, Request, Response } from "express";
import { PetService } from "../service/pet";
import { Pet } from "../model/pet";
import { UpdatePetInput } from '../service/pet'; 

const petService: PetService = new PetService();

export const petRouter: Router = express.Router();

interface CreatePetRequest extends Request {
    params: {};
    body: {
        ownerEmail: string;
        name: string;
        kind: string;
        breed: string;
        birthday: number;
        status: string;
    };
}

petRouter.get("/", async (
    req: Request<{}, Pet[], {}>, res: Response<Pet[]>
) => {
    try {
        const pets: Pet[] = await petService.getPets();
        res.status(200).json(pets);
    } catch (error: any) {
        console.error("Failed to get all pets", error);
        const errorResponse: { error: string }[] = [{ error: "Internal Server Error" }];
        res.status(500).json(errorResponse as unknown as Pet[]);
    }
});


petRouter.post("/", async (
    req: CreatePetRequest, res: Response<string>
) => {
    if (typeof (req.body.ownerEmail) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- ownerEmail has type ${typeof (req.body.ownerEmail)}`);
        return;
    }
    if (typeof (req.body.name) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- name has type ${typeof (req.body.name)}`);
        return;
    }
    if (typeof (req.body.kind) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- kind has type ${typeof (req.body.kind)}`);
        return;
    }
    if (typeof (req.body.breed) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- breed has type ${typeof (req.body.breed)}`);
        return;
    }
    if (typeof (req.body.birthday) !== "number") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- birthday has type ${typeof (req.body.birthday)}`);
        return;
    }
    const ownerEmail: string = req.body.ownerEmail;
    const name: string = req.body.name;
    const kind: string = req.body.kind;
    const breed: string = req.body.breed;
    const birthday: number = req.body.birthday;
    const status: string = req.body.status;
    try {
        const newPet = await petService.createPet(ownerEmail, name, kind, breed, birthday);
        console.log('Pet created:', newPet);

        res.status(201).send("Pet created");
    } catch (error: any) {
        console.error('Error creating pet:', error.message);

        res.status(400).send("Something went wrong");
    }
});

petRouter.patch("/:id", async (
    req: Request<{ id: string }, {}, UpdatePetInput>,
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    const updates: UpdatePetInput = req.body;

    try {
        await petService.updatePetAttribute(id, updates);
        res.status(200).send("Pet changed one or more attributes");
    } catch (error: any) {
        res.status(400).send(error.message); // Handle error
    }
});


petRouter.delete("/:id", async (
    req: Request<{ id: string }, {}, {}>,
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await petService.deletePet(id);
        res.status(200).send("Pet is deleted");
    } catch (error: any) {
        res.status(400).send(error.message); // Handle error
    }
});
