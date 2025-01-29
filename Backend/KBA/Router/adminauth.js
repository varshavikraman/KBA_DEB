import { Router } from "express";
import authenticate from "../MiddleWare/auth.js";
import adminCheck from "../MiddleWare/adminCheck.js";

const adminauth = Router();

const course = new Map();

adminauth.post('/addCourse',authenticate,adminCheck,(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,courseType,Description,Price} = req.body;
            if(course.get(courseName)){
                res.status(400).json({msg :`${courseName} already exist`});
            }else{
            course.set(courseName,{courseId,courseType,Description,Price});
            res.status(201).json({msg: `${courseName} added successfully`})
            console.log(course.get(courseName))
        }
    //}else{
    //    res.status(403).json({msg:"You are not allowed to do this"})
    //}
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
        
    })

   /* adminauth.get('/getCourse/:cname',(req,res)=>{
        const name = req.params.cname;
        console.log(name);
    }) */


adminauth.get('/getCourse',(req,res)=>{
    try{
        const name = req.query.courseName;
        console.log(name);

        const result = course.get(name);
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

adminauth.put('/updateCourse',authenticate,adminCheck,(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,courseType,Description,Price} = req.body;
            if(course.get(courseName)){
                course.set(courseName,{courseId,courseType,Description,Price});
                res.status(201).json({msg: `${courseName} updated successfully`})
                console.log(course.get(courseName))
            }else{
                res.status(400).json({msg :`${courseName} doesn't exist`}); 
            }
        //}else{
        //    res.status(403).json({msg:"You are not allowed to do this"})
        //}
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }
})

adminauth.patch('/editCourse',authenticate,adminCheck,(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,Price} = req.body;
            console.log(courseId);
            const result =course.get(courseName)
            console.log(result)
            if(result){
                course.set(courseName,{courseId,courseType:result.courseType,Description:result.Description,Price});
                res.status(200).json({msg: `${courseName} updated successfully`})
                console.log(course.get(courseName))
            }else{
                res.status(404).json({msg :`${courseName} doesn't exist`}); 
            }  
        //}else{
        //    res.status(403).json({msg:"You are not allowed to do this"})
        //}
    }
    catch{ 
        res.status(500).send("Internal Sever Error");
    }
})

export {adminauth}