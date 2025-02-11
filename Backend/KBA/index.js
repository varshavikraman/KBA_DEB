import express, {json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './Router/userauth.js';
import { adminauth } from './Router/adminauth.js';
//import { adminSignup } from './Router/adminsignup.js';
import cors from'cors';
import mongoose from 'mongoose';



dotenv.config();

const app=express();//we set any variable name (app or any name)

app.use(cors({
    origin:"http://127.0.0.1:5501",
    credentials:true
}))
app.use(json());

app.use('/',userauth);
app.use('/',adminauth);
//app.use('/admin',adminSignup);
// app.use('/api',adminSignup)


app.get('/',function(req,res){
    console.log('Hello');
    
    res.send("Hello Everyone")
})

app.post('/',function(req,res){
    res.send("Hello Everyone");
})

mongoose.connect('mongodb://localhost:27017/KBACourse').then(()=>{
    console.log('mongoDB is connected successfully to KBA');
    })
    .catch((error)=>{
        console.error('MongoDB connection failed',error);
    });
    

/* app.listen(8000,function(){
    console.log('server is listening at 8000');
    
});//(8000) is the port */
app.listen(process.env.PORT,function(){
     console.log(`server is listening at ${process.env.PORT}`);
     
})