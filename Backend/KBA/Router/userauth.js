import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//import authenticate from "../MiddleWare/auth.js";
import {sample} from "../Models/sample.js";
dotenv.config();

const userauth = Router();

//const user = new Map();
//const course = new Map();

userauth.get('/',(req,res)=>{
    console.log('hi');
    
    res.send("Hi Everyone")
})

userauth.post('/signup',async(req,res)=>{
    try{
    // console.log(req.body);
    // const data =req.body;
    // console.log(data.userName);
    // user.set(data.userName,{Name:data.firstName,initial:data.lastName,password:data.password,userRole:data.userRole});
    // console.log(user.get(data.UserName));
    const {firstName,lastName,userName,password,userRole} = req.body;
    console.log(firstName);
    // user.set(UserName,{firstName,lastName,password,userRole});
    
    const existingUser = await sample.findOne({UserName:userName});

    /* const newPassword = await bcrypt.hash(password,10);
    console.log(newPassword);*/

    if(existingUser){
        res.status(400).send("This Username already exists");
    }
    else{
        const newPassword = await bcrypt.hash(password,10);
        console.log(newPassword);
        //user.set(userName,{firstName,lastName,password:newPassword,userRole});
        const newUser = new sample({
            FirstName: firstName,
            LastName : lastName,
            UserName : userName,
            Password : newPassword,
            UserRole : userRole
        }); // save user to MongoDB
        await newUser.save();
        res.status(201).send("SignUp Successfully")

    console.log(user.get(userName));
    }
}
catch{
    res.status(500).send("Internal Server Error")
}
})

userauth.post('/login',async(req,res)=>{
    try{
        const {userName,password}=req.body;
        //const result = user.get(userName)
        const result = await sample.findOne({UserName:userName});
        if(!result){
            res.status(400).send("Enter the valid password")
        }
        else{
            console.log(result.Password);
            const valid = await bcrypt.compare(password,result.Password);
            console.log(valid);
            if(valid){
                const token = jwt.sign({userName:userName,userRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('authToken',token,
                    {
                        httpOnly:true
                });
                console.log("Logged in successfully");
                
                res.status(200).json({message:"Logged in successfully"});
            }
            else{

                res.status(401).send("Unauthorized access");

            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})

/* userauth.post('/addCourse',authenticate,(req,res)=>{
try{
        if(req.Role == "Admin"){
    const {courseName,courseId,courseType,Description,Price} = req.body;
    if(course.get(courseName)){
        res.status(400).json({msg :`${courseName} already exist`});
    }else{
        course.set(courseName,{courseId,courseType,Description,Price});
        res.status(201).json({msg: `${courseName} added successfully`})
        console.log(course.get(courseName))
    }
}else{
    res.status(403).json({msg:"You are not allowed to do this"})
}
}
catch{
    res.status(500).send("Internal Server Error")
}
    
}) */

userauth.get('/logout',(req,res)=>{
    res.clearCookie("authToken");
    res.status(200).json({msg:"logged out successfully"})
})

export {userauth}