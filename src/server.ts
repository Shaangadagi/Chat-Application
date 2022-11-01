import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { PORT } from './config/config';
import User from './models/userModel';
import userRoutes from './Routes/userRoutes';

const app: express.Application = express();

var corsOptions = {
    origin: "http://localhost:5000"
  };

app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

User.sync({ force: false });

app.use('/api/user',userRoutes)

declare global {
  namespace Express {
      interface Request {
          user: any;
          token: string;
      }
  }
}

// app.get('/',(req:Request,res:Response,next:NextFunction)=>{
// res.send("good")
// })


app.listen(PORT, () => {
    console.log(`app listening on: http://localhost:${PORT}`);
});