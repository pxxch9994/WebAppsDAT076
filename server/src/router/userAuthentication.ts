import { Request, Response, NextFunction } from 'express';


export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session) {
            // User is authenticated, proceed to the next middleware or route handler
            next();
    } else {
        // User is not authenticated, terminate the request-response cycle
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};
