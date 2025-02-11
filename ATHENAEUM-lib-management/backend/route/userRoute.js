import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { book } from "./adminRoute.js";
import authenticate from "../middleware/auth.js";


dotenv.config();

const userRoute = Router();

const user = new Map();
const issue = new Map();


userRoute.post('/signup',async(req,res)=>{
    try{
    const {Name,UserName,Password,UserRole} = req.body;
    console.log(Name);

    if(user.get(UserName)){
        res.status(400).send("This Username already exists");
    }
    else{
        const newPassword = await bcrypt.hash(Password,10);
        console.log(newPassword);
        user.set(UserName,{Name,Password:newPassword,UserRole});
        res.status(201).send("SignUp Successfully")

    console.log(user.get(UserName));
    }
}
catch{
    res.status(500).send("Internal Server Error")
}
})

userRoute.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body;
        const result = user.get(UserName)
        if(!result){
            res.status(400).send("Enter the valid password")
        }
        else{
            console.log(result.Password);
            const valid = await bcrypt.compare(Password,result.Password);
            console.log(valid);
            if(valid){
                const token = jwt.sign({userName:UserName,userRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('authToken',token,
                    {
                        httpOnly:true
                });
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

userRoute.get('/getBook',(req,res)=>{
    try{
        const bookDetail = req.query.BookTitle
        const result = book.get(bookDetail);

        if(result){
            res.status(200).json({Data:result})
        }else{
            res.status(401).json({msg:"No such course available"})
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})

userRoute.post('/issueBook',authenticate,(req,res)=>{
    try{
        const {UserName:UserName,BookId,DateofIssue,DateofReturn} = req.body;
        if(req.Role == 'admin' || req.Role == 'user'){
            issue.set(UserName,{BookId,DateofIssue,DateofReturn});
            res.status(201).send("Issued book successfully");
            console.log(issue.get(UserName))
        }else{
            res.status(401).send("Unauthorized access");
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
        
})

userRoute.get('/logout',(req,res)=>{
    res.clearCookie("authToken");
    res.status(200).json({msg:"logged out successfully"})
})

export {userRoute}