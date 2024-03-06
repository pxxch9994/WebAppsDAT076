import { Request, Response, NextFunction } from 'express';
// Middleware to check if the user is authenticated
export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.session && req.session.username) {
            // User is authenticated, proceed to the next middleware or route handler
            next();
        } else {
            // User is not authenticated, terminate the request-response cycle
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        // Send a generic server error response
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

