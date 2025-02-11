import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticate from "../middleware/auth.js";
dotenv.config();

const userauth = Router();

const user = new Map();
const certificate = new Map();

userauth.post('/signup',async(req,res)=>{
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

userauth.post('/login',async(req,res)=>{
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
                const token = jwt.sign({UserName:UserName,UserRole:result.UserRole},process.env.SECRET_KEY,{expiresIn:'1h'});
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

userauth.post('/issueCertificate',authenticate,(req,res)=>{
try{
    
    if(req.Role == "admin"){
            const {CourseName,CertificateId,CandidateName,Grade,IssuedDate} = req.body;
            if(certificate.get(CertificateId)){
                res.status(400).json({msg :`${CertificateId} already exist`});
            }else{
                certificate.set(CertificateId,{CourseName,CandidateName,Grade,IssuedDate});
                res.status(201).json({msg: `${CertificateId} added successfully`})
                console.log(certificate.get(CertificateId))
            }
    }else{
        res.status(403).json({msg:"You are not allowed to do this"})
    }
}
catch{
    res.status(500).send("Internal Server Error")
}
})

userauth.put('/editCourse',authenticate,(req,res)=>{
    try{
        if(req.Role == "Admin"){
            const {CourseName,CertificateId,CandidateName,Grade,IssuedDate} = req.body;
            if(certificate.get(CertificateId)){
                certificate.set(CertificateId,{CourseName,CandidateName,Grade,IssuedDate});
                res.status(201).json({msg: `${CertificateId} updated successfully`})
                console.log(course.get(CertificateId))
            }else{
                res.status(400).json({msg :`${CertificateId} doesn't exist`}); 
            }
        }else{
            res.status(403).json({msg:"You are not allowed to do this"})
        }
    }
    catch{ 
        res.status(500).send("Internal Sever Error");
    }
})

userauth.get('/viewCertificate',(req,res)=>{
    try{
        const certiapp = req.query.certificateId

        const result = certificate.get(certiapp);
            if(result){
                res.status(200).json({data:result});
            }else{
                res.status(404).json({msg:"No such course available"});
            }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }
})

userauth.get('/logout',(req,res)=>{
    res.clearCookie("authToken");
    res.status(200).json({msg:"logged out successfully"})
})

export {userauth}