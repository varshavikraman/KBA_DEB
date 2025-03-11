import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../Middleware/auth.js";
import user from "../Models/sample1.js";
dotenv.config();

const userauth=Router();



userauth.get('/',(req,res)=>{
    console.log("HI");
    res.send("Hello Everyone");
});

userauth.post('/signup',async(req,res)=>{
    try{
        
    // console.log(req.body);
    // const data =req.body;
    // console.log(data.UserName);
    // user.set(data.UserName,{Name:data.FirstName,initial:data.LastName,Password:data.Password,UserRole:data.UserRole});
    // console.log(user.get(data.UserName));
    const {FirstName,LastName,UserName,Password,UserRole} = req.body;
    console.log(FirstName);
    // user.set(UserName,{FirstName,LastName,Password,UserRole});
    
    const existingUser=await user.findOne({userName:UserName})
    console.log(existingUser);
    
   // if(user.get(UserName)){
  // if(sample.findOne({userName:UserName}))
  if(existingUser){
       res.status(400).json("Username already exist") ;
    }
    else{
        const newPassword =await bcrypt.hash(Password,10);
        console.log(newPassword);
        //user.set(UserName,{FirstName,LastName,Password:newPassword,UserRole});
        const newUser = new user({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newPassword,
            userRole: UserRole
          });
           // Save user to MongoDB
          await newUser.save();
        res.status(201).json("Signed-up successfully")
    }}
    

catch{
    res.status(500).json("Internal Server error");
}
// finally{

// }    
   
})

userauth.post('/login',async(req,res)=>{
    try{
        const {UserName,Password}=req.body;
        //const result = user.get(UserName);
        const result = await user.findOne({userName:UserName})
console.log(result);

        if(!result){
            res.status(400).json("Enter a valid username");
        }
        else{
            console.log(result.password);
            const valid = await bcrypt.compare(Password,result.password);
            console.log(valid);
            if(valid){
                const token = jwt.sign({UserName:UserName,UserRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('authToken',token,
                {
                    httpOnly:true
                });
                res.status(200).json({message:"Logged in successfully"});
            }
            else{

                res.status(401).json({msg:"Unauthorized access"});

            }
         }

    }
    catch{
        res.status(500).json({msg:"Internal Server Error"})
    }
})

userauth.get('/logout',(req,res)=>{
    res.clearCookie('authToken');
    res.status(200).json({msg:"Successfully logged out"})
})

userauth.get('/profile',authenticate,async(req,res)=>{
    res.status(200).json({UserName:req.user, userRole:req.role})
})
export {userauth};