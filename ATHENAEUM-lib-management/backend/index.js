import express, {json} from 'express';
import dotenv from 'dotenv';
import { userRoute } from './route/userRoute.js';
import { adminrRoute } from './route/adminRoute.js';

dotenv.config();

const app=express();

app.use(json());

app.use('/',userRoute);
app.use('/',adminrRoute);

app.listen(process.env.PORT,function(){
     console.log(`server is listening at ${process.env.PORT}`);
     
})