import { Request, Response, NextFunction } from "express";

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if(req.session && req.session.username) {
        next(); // Pass to the next express module. Continue where this is imported.
    } else {
        res.status(401).json({
            message: "Unauthorized" // Gives error to catch if a user don't have session
        });
    }
};