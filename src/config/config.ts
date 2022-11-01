import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT!

export const DATABASE_NAME = process.env.DATABASE_NAME!
export const DATABASE_USER = process.env.DATABASE_USER!
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD!

export const JWT_SCRETKEY = process.env.JWT_SCRETKEY!

export const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE!
export const JWT_REGISTERKEY=process.env.JWT_REGISTERKEY!;
export const REGISTER_TOKEN_EXPIRE=process.env.REGISTER_TOKEN_EXPIRE!;