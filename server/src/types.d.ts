// custom-types.d.ts
import 'express';

declare module 'express-serve-static-core' {
    // Fix some type errors for type safety
    interface SessionData {
        username?: string;
        name?: string;
        email?: string;
    }

    interface Request {
        session?: Session & SessionData;
    }
}
