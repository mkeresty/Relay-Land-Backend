import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
    req: Request, 
    res: Response, 
    next: NextFunction 
    ) =>{
        console.log("isauth")
        console.log(req.user);
        (req.user ? next() : res.status(403).send({msg: 'Unauthorized'}))
    };