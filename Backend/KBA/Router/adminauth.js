import { Router } from "express";
import authenticate from "../MiddleWare/auth.js";
const adminauth = Router();

const course = new Map();

adminauth.post('/addCourse',authenticate,(req,res)=>{
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
        
    })

    export {adminauth}