// custom-types.d.ts
// Importing the 'express' module
import 'express';
// Augmenting the 'express-serve-static-core' module to add custom types
declare module 'express-serve-static-core' {
    // Extending the 'SessionData' interface to include additional properties
    // like username, name, and email
    interface SessionData {
        username?: string;
        name?: string;
        email?: string;
    }
    // Extending the 'Request' interface to include a session property which is
    // a combination of the generic Session and the custom SessionData interface
    interface Request {
        session?: Session & SessionData;
    }
}
