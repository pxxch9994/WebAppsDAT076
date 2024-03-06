import express from 'express';
import { userRouter } from './router/user';
import { petRouter } from './router/pet';
import session from 'express-session';
import cors from 'cors';

// Express app initialization
export const app = express();

// CORS middleware configuration
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Session middleware configuration
// TODO exchange the secret key for security reasons

// TODO comment what resave and saveUninitialized does
const sessionConfig: session.SessionOptions = {
    secret: 'ba7343a11c4dbfe0511d39e40df6449cc5f3912e5cf055bc8362d013ff6a325f',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // For HTTP only
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
};

// Middlewares
app.use(session(sessionConfig));
app.use(express.json());
app.use('/user', userRouter);
app.use('/pet', petRouter);

