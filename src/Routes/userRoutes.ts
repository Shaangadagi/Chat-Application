import express from 'express';

import {
	getAllUsers,
	login,
	registerUser,
} from '../controllers/userController';
import { auth } from '../middleware/auth';

export const userRoutes=express.Router();

userRoutes.route('/').post(registerUser)
userRoutes.route('/login').post(login)
userRoutes.route('/').get(auth,getAllUsers);



export default userRoutes