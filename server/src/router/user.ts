import express, { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../service/user";
import { checkAuthentication } from "./userAuthentication";
// Initializing UserService
const userService = new UserService();
// Initializing userRouter
export const userRouter = express.Router();
// Interface for request with specific body fields for creating a user
interface CreateUserRequest extends Request {
    params: {},
    body: { username: string, name: string, email: string, password: string }
}
// Middleware for validating request body
const validateUserFields = (req: Request, res: Response, next: NextFunction) => {
    const { username, name, email, password } = req.body;
    if (typeof username !== "string" || typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).send("Bad request: Invalid input types");
    }
    next();
};
// Route to get all users
userRouter.get("/", async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error: any) {
        console.error('Error fetching users:', error.message);
        res.status(500).send("Internal server error");
    }
});
// Route for user login
userRouter.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await userService.authenticate(username, password);

        if (user) {
            req.session.username = user.username;
            req.session.name = user.name;
            req.session.email = user.email;

            console.log("Authentication success" + JSON.stringify(req.session));
            res.status(200).json(req.session);
        } else {
            console.log("Authentication failed");
            res.status(401).send("Authentication failed");
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
// Route to get session information
userRouter.get('/session', checkAuthentication, (req, res) => {
    res.status(200).send(req.session);
});
// Route to create a new user
userRouter.post("/", validateUserFields, async (req: CreateUserRequest, res: Response) => {
    const { username, name, email, password } = req.body;
    try {
        const newUser = await userService.createUser(username, name, email, password);
        console.log('User created:', newUser);
        res.status(201).send("User created");
    } catch (error: any) {
        console.error('Error creating user:', error.message);
        res.status(error.code === 11000 ? 409 : 500).send(error.code === 11000 ? "User already exists" : "Internal server error");
    }
});
// Route to delete a user by username
userRouter.delete("/:username", async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.username);
        if (success) {
            res.status(200).send("User deleted");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error: any) {
        console.error('Error deleting user:', error.message);
        res.status(500).send("Internal server error");
    }
});
// Route for user logout
userRouter.get('/logout', (req, res) => {
    if (req.session && req.session.username) {
        req.session.destroy((err: any) => {
            if (err) {
                console.error("Error logging out", err);
                res.status(500).send('Error logging out');
            } else {
                res.clearCookie('connect.sid');
                res.send('Logout successful');
            }
        });
    } else {
        console.log("no active")
        res.status(200).send('No active session to logout');
    }
});


