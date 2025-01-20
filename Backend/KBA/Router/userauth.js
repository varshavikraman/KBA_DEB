import { Router } from "express";

const userauth = Router();

userauth.get('/',(req,res)=>{
    console.log('hi');
    
    res.send("Hi Everyone")
})

export {userauth}