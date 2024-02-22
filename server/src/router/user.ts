import express, { Router, Request, Response } from "express";
import { UserService } from "../service/user";
import { User } from "../model/user";

const userService: UserService = new UserService();

export const userRouter: Router = express.Router();

interface CreateUserRequest extends Request {
    params: {};
    body: { username: string; name: string; email: string; password: string };
}

userRouter.get("/", async (
    req: Request<{}, User[], {}>, res: Response<User[]>
) => {
    try {
        const users: User[] = await userService.getUsers();
        res.status(200).json(users);
    } catch (error: any) {
        console.error("Failed to get all users", error);
        const errorResponse: { error: string }[] = [{ error: "Internal Server Error" }];
        res.status(500).json(errorResponse as unknown as User[]);
    }
});

userRouter.post("/", async (
    req: CreateUserRequest, res: Response<string>
) => {
    try {
        const { username, name, email, password } = req.body;
        const newUser = await userService.createUser(username, name, email, password);
        console.log('User created:', newUser);

        res.status(201).send("User created");
    } catch (error: any) {
        console.error('Error creating user:', error.message);
        res.status(401).send("User already exists");
    }
});

userRouter.delete("/:username", async (
    req: Request<{ username: string }, {}, {}>,
    res: Response<string>
) => {
    try {
        const username: string = req.params.username;
        await userService.deleteUser(username);
        res.status(200).send("User is deleted");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

userRouter.patch("/:username", async (
    req: Request<{ username: string }, {}, { name: string }>,
    res: Response<string>
) => {
    try {
        const username: string = req.params.username;
        const { name } = req.body;
        await userService.updateUser(username, { name });
        res.status(200).send("User name changed");
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

userRouter.get('/profile', async (req, res) => {
    if (req.session?.username) {
        try {
            const userData = await userService.getUserByUsername(req.session.username);
            if (userData) {
                console.log(userData.username + " name: " + userData.name);
                res.json({ username: userData.username, name: userData.name });
            } else {
                res.status(404).send('User not found');
            }
        } catch (error: any) {
            console.error("Failed to get user profile", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(401).json({ error: 'Please login to view this page!' });
    }
});

userRouter.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticate(username, password);
        if (user) {
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
        console.error("Error during login", error);
        res.status(500).send(error.message);
    }
});

userRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error logging out", err);
                res.status(500).send('Error logging out');
            } else {
                res.clearCookie('connect.sid');
                res.send('Logout successful');
            }
        });
    } else {
        res.status(200).send('No active session to logout');
    }
});
