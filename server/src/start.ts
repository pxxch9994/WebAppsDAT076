import express from 'express';
import { userRouter } from './router/user';
import { petRouter } from './router/pet';
import session from 'express-session';
import cors from 'cors';

// Express app initialization
export const app = express();
// CORS middleware configuration
// This middleware enables Cross-Origin Resource Sharing (CORS) by specifying the allowed origin and credentials usage.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
/*
Session middleware configuration
The `resave` option determines whether the session should be saved back to the session store even if it wasn't modified during the request.
Setting it to false optimizes the session handling.
The `saveUninitialized` option indicates whether to save uninitialized/new sessions. If set to true,
a session will be created for every request even if it hasn't been modified,
and it's usually set for compliance with laws regarding cookie consent.
 */
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

