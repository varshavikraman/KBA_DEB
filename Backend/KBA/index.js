import express, {json} from 'express';
import dotenv from 'dotenv';
import { userauth } from './Router/userauth.js';

dotenv.config();

const app=express();//we set any variable name (app or any name)

app.use(json());

app.use('/',userauth);

app.get('/',function(req,res){
    console.log('Hello');
    
    res.send("Hello Everyone")
})

app.post('/',function(req,res){
    res.send("Hello Everyone");
})

/* app.listen(8000,function(){
    console.log('server is listening at 8000');
    
});//(8000) is the port */
app.listen(process.env.PORT,function(){
     console.log(`server is listening at ${process.env.PORT}`);
     
})