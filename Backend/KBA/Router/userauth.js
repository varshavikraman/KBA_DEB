import { Router } from "express";
import bcrypt from 'bcrypt';

const userauth = Router();

const user = new Map();

userauth.get('/',(req,res)=>{
    console.log('hi');
    
    res.send("Hi Everyone")
})

userauth.post('/signup',async(req,res)=>{
    // console.log(req.body);
    // const data =req.body;
    // console.log(data.userName);
    // user.set(data.userName,{Name:data.firstName,initial:data.lastName,password:data.password,userRole:data.userRole});
    // console.log(user.get(data.UserName));
    const {firstName,lastName,userName,password,userRole} = req.body;
    console.log(firstName);
    // user.set(UserName,{firstName,lastName,password,userRole});
    
    const newPassword = await bcrypt.hash(password,10);
    console.log(newPassword);
    user.set(userName,{firstName,lastName,password:newPassword,userRole});
    console.log(user.get(userName));
})

export {userauth}