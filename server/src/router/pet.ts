import express, {Router, Request, Response, NextFunction} from "express";
import { PetService } from "../service/pet";
import {Pet, PetUpdate} from "../model/pet";
import {checkAuthentication} from "./userAuthentication";

const petService : PetService = new PetService();

export const petRouter : Router = express.Router();

interface CreatePetRequest extends Request {
    params : {},
    body: {
        owner : string,
        ownerEmail: string,
        name : string,
        image: string,
        kind : string,
        breed : string,
        birthday : number,
        status: string,
        description: string
    }
}

const validatePetFields = (req: Request, res: Response, next: NextFunction) => {
    const { owner, ownerEmail, name, image, kind, breed, birthday, status, description } = req.body;
    if (typeof owner !== "string" || typeof ownerEmail !== "string" || typeof name !== "string" || typeof image !== "string" || typeof kind !== "string" || typeof breed !== "string" || typeof birthday !== "number" || typeof status !== "string" || typeof description !== "string") {
        return res.status(400).send("Bad request: Invalid input types");
    }
    next();
};

petRouter.get("/", async (
    req : Request<{},Pet[],{}>, res : Response<Pet[]>
) => {
    const pets : Pet[] = await petService.getPets();
    res.status(200).send(pets);
})

petRouter.get("/profile", checkAuthentication, async (
    req: Request<{}, Pet[], {}>, res: Response<Pet[]>
) => {
    if(req.session) {
        try {
            const pets: Pet[] = await petService.getProfilePets(req.session.username);
            res.status(200).send(pets);
        } catch (error) {
            console.error("Failed to fetch profile pets:", error);
            res.status(400).send([]);
        }
    }
});
petRouter.post("/", validatePetFields, checkAuthentication, async (
    req: CreatePetRequest , res : Response<string>
) => {
    const { owner, ownerEmail, name, image, kind, breed, birthday, status, description } = req.body;
    // TODO check if owner matches the current req.session.username.
    try {
        const newPet = await petService.createPet(owner, ownerEmail, name, image, kind, breed, birthday, status, description);
        console.log('Pet created:', newPet);

        res.status(201).send("Pet created");
    } catch (error : any) {
        console.error('Error creating pet:', error.message);

        res.status(400).send("Something went wrong");
    }
})


petRouter.patch("/:id", checkAuthentication, async (
    req: Request<{ id: string }, {}, Partial<PetUpdate>>,
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    const updates: Partial<PetUpdate> = req.body;
    try {
        await petService.updatePetAttribute(id, updates);
        res.status(200).send("Pet changed one or more attributes");
    } catch (error : any) {
        res.status(400).send(error.message);
    }
});

petRouter.delete("/:id", checkAuthentication, async (
    req: Request<{id: string}, {}, {}>,
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await petService.delete(id);
        res.status(200).send("Pet is deleted");
    } catch (error : any) {
        res.status(400).send(error.message);
    }
});