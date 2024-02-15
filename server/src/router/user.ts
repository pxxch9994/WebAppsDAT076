import express, { Router, Request, Response } from "express";
import { UserService } from "../service/user";
import { User } from "../model/user";

const userService : UserService = new UserService();

export const userRouter : Router = express.Router();

interface CreateUserRequest extends Request {
    params: {},
    body: { username: string, name: string, password: string }
}

userRouter.get("/", async (
    req : Request<{},User[],{}>, res : Response<User[]>
) => {
    const users : User[] = await userService.getUsers();
    res.status(200).send(users);
})

userRouter.post("/", async (
    req: CreateUserRequest , res : Response<string>
) => {
    if (typeof(req.body.username) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has type ${typeof(req.body.username)}`);
        return;
    }
    if (typeof(req.body.name) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- name has type ${typeof(req.body.name)}`);
        return;
    }
    if (typeof(req.body.password) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type ${typeof(req.body.password)}`);
        return;
    }
    const username : string = req.body.username;
    const name : string = req.body.name;
    const password : string = req.body.password;
    try {
        const newUser = await userService.createUser(username, name, password);
        console.log('User created:', newUser);

        res.status(201).send("User created");
    } catch (error : any) {
        console.error('Error creating user:', error.message);

        res.status(401).send("User already exist");
    }
})

userRouter.delete("/:username", async (
    req: Request<{username: string}, {}, {}>,
    res: Response<string>
) => {
    const username: string = req.params.username;
    try {
        await userService.deleteUser(username);
        res.status(200).send("User is deleted");
    } catch (error : any) {
        res.status(400).send(error.message); // Handle error
    }
});


userRouter.patch("/:username", async (
    req: Request<{ username: string }, {}, { name: string }>, // Corrected type definition
    res: Response<string>
) => {
    const username: string = req.params.username;
    const name: string = req.body.name; // Get name from request body
    try {
        await userService.changeName(username, name);
        res.status(200).send("User changed name");
    } catch (error : any) {
        res.status(400).send(error.message); // Handle error
    }
});

userRouter.get('/session', (req, res) => {
    if (req.session.username && req.session) {
        const userData = userService.getUserByUsername(req.session.username);
        if (userData) {
            console.log(userData.username + "name: " + userData.name)
            res.json({ username: userData.username, name: userData.name });
        } else {
            res.status(404).send('Userdata not found');
        }
    } else {
        res.status(401).json({ error: 'No user is logged in!' });
    }
});

userRouter.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticate(username, password);
        if (user) {
            // Store user information in session
            if (req.session) {
                req.session.username = user.username;
            }
            console.log("Authentication success");
            res.status(200).json(user);
        } else {
            console.log("Authentication failed");
            res.status(401).send("Authentication failed");
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

userRouter.get('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Error logging out');
            }
            // Clear the session cookie
            res.clearCookie('connect.sid'); // Adjust the cookie name if different
            return res.send('Logout successful');
        });
    } else {
        return res.status(200).send('No active session to logout');
    }
});



