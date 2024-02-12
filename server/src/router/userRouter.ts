import express, { Request, Response, Router } from "express";
import { User, Pet } from "../model/userModel";
import { UserService } from "../service/userService";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

/**
 *
 */
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

/**
 * Register a new user.
 */
userRouter.post("/users/", async (
    req: Request<{ username : string, password : string }, {} >, //TODO try ro delete the second {}
    res: Response<User | string>
) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (typeof(username) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- username has type ${typeof(username)}`);
            return;
        }
        const addUser = await userService.addUser(username, password);
        res.status(201).send(addUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

/**
 * Add a new pet to existing user.
 */
userRouter.post("/pets/", async (
    req: Request<{ petName: string, username: string, image: string, kind: string, breed: string, birthday: number }, {} >,
    res: Response<Pet | string>
) => {
    try {
        const petName = req.body.petName;
        const username = req.body.username;
        const image = req.body.image;
        const kind = req.body.kind;
        const breed = req.body.breed;
        const birthday = req.body.birthday;

        switch (true) {
            case (typeof petName !== "string"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- petName has type string`);
                return;
            case (typeof username !== "string"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- username has type string`);
                return;
            case (typeof image !== "string"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- image has type string`);
                return;
            case (typeof kind !== "string"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- kind has type string`);
                return;
            case (typeof breed !== "string"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- breed has type string`);
                return;
            case (typeof birthday !== "number"):
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- ownerId has type number`);
                return;
            default:
            // Do nothing
        }
        const addPet = await userService.addPet(petName, username, image, kind, breed, birthday);
        res.status(201).send(addPet);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

/*
curl -X POST -H "Content-Type: application/json" -d "{ \"petName\": \"myPetName\", \"username\": \"myUsername\", \"image\": \"myImage\", \"kind\": \"myPetKind\", \"breed\": \"myPetBreed\", \"birthday\": 123456 }" -i http://localhost:8080/pets
curl -X POST -H "Content-Type: application/json" -d "{ \"username\" : \"myUsername\",  \"password\" : \"myPassword\"}" -i localhost:8080/users
*/