import express from "express";
import { userRouter } from "./router/user";
import cors from "cors";
import {petRouter} from "./router/pet";
import {postRouter} from "./router/post";
import session from "express-session";

export const app = express();

// Your session configuration
const sessionConfig: session.SessionOptions = {
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // For HTTP only. Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
};

// Apply the session middleware to the app
app.use(session(sessionConfig));

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend
    credentials: true, // Allows cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware
app.use("/user", userRouter);
app.use("/pet", petRouter);
app.use("/post", postRouter);