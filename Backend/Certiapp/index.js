import express, {json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './router/userauth.js';

dotenv.config();

const app=express();

app.use(json());

app.use('/',userauth);

app.listen(process.env.PORT,function(){
     console.log(`server is listening at ${process.env.PORT}`);
     
})