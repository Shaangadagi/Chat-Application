import express, { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

import { JWT_SCRETKEY, TOKEN_EXPIRE } from '../config/config';
import User from '../models/userModel';

const { Op } = require("sequelize");

const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
export const registerUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {
            
            fullName,
            userName,
            pno,
            email,
            password,
            confirmPassword,
            profile,
            role,
        } = req.body;

        const userEmail = await User.findOne({
            where: {
                email: email,
            },
        });

        if (userEmail == null) {
            if ( fullName && userName && email && pno && password && confirmPassword ||profile ) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const hashedConfirmPassword = await bcrypt.hash(
                    confirmPassword,
                    10,
                );

                if (password === confirmPassword) {
                    var user = await User.create({
                       
                        fullName,
                        userName,
                        email,
                        pno,
                        password: hashedPassword,
                        confirmPassword: hashedConfirmPassword,
                        role,
                        profile,
                        // token:jsonWebToken.sign({ userId: userEmail.id}, JWT_REGISTERKEY, {
                        //     expiresIn: REGISTER_TOKEN_EXPIRE,
                        // })
                    
                    });

                    res.status(201).send({
                        user,
                        message: 'user created',
                    });
                } else {
                    res.status(400).send({
                        message: "Password And ConfirmPassword Doesn't Match",
                    });
                }
            } else {
                res.status(400).send({ message: 'All Fields All Required' });
            }
        } else {
            res.status(400).send({ message: 'Email Already Exist' });
        }
    } catch (error) {
        console.log(error);
    }
};


//login
export const login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (email && password) {
            const user = await User.findOne({
                where: { email },
            });

            if (user != null) {
                const passwordMatched = await bcrypt.compare(
                    password,
                    user.password,
                );

                //token

                const token = jsonWebToken.sign({ userId: user.id}, JWT_SCRETKEY, {
                    expiresIn: TOKEN_EXPIRE,
                });

                // token saved in cookie
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 60000),
                    httpOnly: true,
                });

                if (user.email === email && passwordMatched) {
                    res.status(200).send({
                        message: 'Login successfully',
                        token,
                        userId:user.id,
                  
                    fullName:user.fullName,
                    userName:user.userName,
                    email:user.email,
                    phone:user.pno,
                    
                    role:user.role,
                    profile:user.profile
                    });
                }
            } else {
                res.status(400).send({ message: 'You Are NOt A Register User' });
            }
        } else {
            res.status(400).send({ message: 'All Fields All Required' });
        }
    } catch (error) {
        console.log(error);
    }
};


export const getAllUsers=async(req: Request,
    res: Response,
    next: NextFunction)=>{
        // const keyword=req.query.search
// const keyword=req.query.search?{
//     where:  {
//         [Op.or]: [
//           {
//             fullName: {
//               [Op.like]: 'Boat%'
//             }
//           },
//           {
//             email: {
//               [Op.like]: '%boat%'
//             }
//           }
//         ]
//       }

    
// }
const users=await User.findAll({
    where:{
        [Op.or]: [
                      {
                        fullName: {
                            [Op.regexp]: req.query.search,
                            // [Op.iLike]: `%${req.query.search}`,
                        }
                      },
                      {
                        email: {
                            [Op.regexp]: req.query.search,
                            // [Op.iLike]: `%${req.query.search}`,
                        }
                      }
                     
                    ],
                    [Op.and]:[
                        {
                          id:{
                            [Op.ne]:req.user.id
                          }
                        }
                        
                    ]
    }
})

res.send(users)
// console.log(keyword)
}


module.exports={
    registerUser,
    login,
    getAllUsers
}