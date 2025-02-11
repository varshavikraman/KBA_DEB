import { Router } from "express";
import authenticate from "../MiddleWare/auth.js";
import adminCheck from "../MiddleWare/adminCheck.js";
import {sample1} from "../Models/sample.js";
import upload from "../MiddleWare/upload.js"

const adminauth = Router();

//const course = new Map();

adminauth.post('/addCourse',authenticate,adminCheck,upload.single("courseImage"),async(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,courseType,Description,Price} = req.body;
            const result = await sample1.findOne({CourseName:courseName});
            if(result){
                res.status(400).json({msg :`${courseName} already exist`});
            }else{
            //course.set(courseName,{courseId,courseType,Description,Price});
            const imagePath =req.file? req.file.path: "";

            const newCourse = new sample1({
                image : imagePath,
                CourseName : courseName,
                CourseId : courseId,
                CourseType : courseType,
                Description : Description,
                Price : Price
            }); // save user to MongoDB
            await newCourse.save();
            res.status(201).json({msg: `${courseName} added successfully`,data:newCourse})
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


adminauth.get('/getCourse',async(req,res)=>{
    try{
        const name = req.query.coursename;
        console.log(name);

        const result = await sample1.findOne({CourseName:name});
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

adminauth.put('/updateCourse',authenticate,adminCheck,async(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,courseType,Description,Price} = req.body;
            const result = await sample1.findOne({CourseName:courseName});
            console.log(result)
            //if(course.get(courseName)){
                //course.set(courseName,{courseId,courseType,Description,Price});
            if(result){
                result.CourseName = courseName,
                result.CourseId = courseId,
                result.CourseType = courseType,
                result.Description = Description,
                result.Price = Price

                await result.save();
                res.status(201).json({msg: `${courseName} updated successfully`})
                console.log(result)
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

adminauth.patch('/editCourse',authenticate,adminCheck,async(req,res)=>{
    try{
        //if(req.Role == "Admin"){
            const {courseName,courseId,Price} = req.body;
            console.log(courseId);
            //const result =course.get(courseName)
            const result = await sample1.findOne({CourseName:courseName});
            console.log(result)
            if(result){
                //course.set(courseName,{courseId,courseType:result.courseType,Description:result.Description,Price});
                result.CourseName = courseName,
                result.CourseId = courseId,
                result.Price = Price

                await result.save();
                res.status(200).json({msg: `${courseName} updated successfully`})
                console.log(result)
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

adminauth.delete('/deleteCourse',authenticate,adminCheck,async(req,res)=>{
    try{
        const {courseName} = req.body;
        console.log(courseName);
        const result = await sample1.findOne({CourseName:courseName});
        //const result = course.get(courseName)
        if(result){
            //course.delete(courseName)
            await sample1.findOneAndDelete({CourseName:courseName});
            res.status(200).json({msg:`${courseName} deleted successfully`})
            console.log(courseName)
        }else{
            res.status(404).json({msg :`${courseName} doesn't exist`});
        }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }

})
export {adminauth}