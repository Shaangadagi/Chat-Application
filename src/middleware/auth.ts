import express, { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import jsonWebToken from 'jsonwebtoken';

import { JWT_SCRETKEY } from '../config/config';
import User from '../models/userModel';

export const auth: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        //get the token
        const token: string = req.cookies.jwt;
        console.log(token);

        //verify the token
        let verifyUser: {userId: any; iat: number; exp: number} = <any>(
            jsonWebToken.verify(token, JWT_SCRETKEY)
        );
      console.log(verifyUser);

      const users = await User.findOne({ where: { id: verifyUser.userId } });
      console.log(users);


        req.token = token;
        req.user = users;



        next();
    } catch (error) {
        res.status(401).send(error);
    }
};


module.exports = {
    auth,
 
};