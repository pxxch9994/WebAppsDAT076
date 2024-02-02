import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/user";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

userRouter.get("/", async (
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


