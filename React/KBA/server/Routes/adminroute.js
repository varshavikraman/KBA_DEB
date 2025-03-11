import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminauth.js";
import {Course}   from "../Models/sample1.js";
import upload from "../Middleware/upload1.js";  // Import multer configuration
import sharp from "sharp";



const adminauth = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminauth.post("/addCourse",authenticate,adminCheck,upload.single("courseImage"),async(req,res)=>{
    try{
    
    const {CourseName, CourseId, CourseType,Description,Price} = req.body;
    const existingCourse=await Course.findOne({courseName:CourseName})
    if(existingCourse){
        res.status(400).json({msg:"Course name already exist"});
    }
    else{

        let imageBase64 = null;
        if (req.file) {
            // Convert the image buffer to Base64 string
            imageBase64 = convertToBase64(req.file.buffer);
        }
        //course.set(CourseName,{CourseId,CourseType,Description,Price});
        //const imagePath = req.file ? req.file.path : "";

        const newCourse = new Course({
            courseName: CourseName,
            courseId: CourseId,
            courseType: CourseType,
            description: Description,
            price: Number(Price),
            image: imageBase64
        })
        await newCourse.save();
        res.status(201).json({msg:`${CourseName} stored successfully`, data: newCourse})
    }
   
}
catch{
    res.status(500).send("Internal Server error");
}

})

// adminauth.get('/getCourse/:cname',(req,res)=>{

//     const name = req.params.cname;
//     console.log(name);

// })
adminauth.get('/getCourse',async(req,res)=>{
try{
    const name = req.query.courseName;
    console.log("Requested Course:", name);
    const result = await Course.findOne({courseName:name}) ; 
    //.exec();
    //console.log(result);
    
    if(!result){
        return res.status(404).json({msg:"No Such Course found"})
    }
    else{
        res.status(200).json({
            CourseName:result.courseName,
            CourseId:result.courseId,
            CourseType:result.courseType,
            Description:result.description,
            Price:result.price,
            ImageUrl:`/api/getCourseImage?courseName=${encodeURIComponent(name)}`   
        });
    }
}
catch{
    res.status(500).send("Internal Server Error");
}
})

adminauth.get('/getCourseImage',async (req,res) => {
    try {
        const name =req.query.courseName;
        const result = await Course.findOne({courseName:name});
        if(!result || !result.image){
            return res.status(404).json({msg:"Image Not found"})
        }

        // decode the base64 image
        const imageBuffer = Buffer.from(result.image,"base64")
        const compressedImage = await sharp(imageBuffer)
        .resize({width:300})
        .jpeg({quality:70})
        .toBuffer();

        res.set("Content-Type","image/jpeg");
        res.send(compressedImage);
    } catch (error) {
        console.log('Error Fetching Image:' ,error);
        res.status(500).send("Internal Server Error");
    }
})

adminauth.put('/updateCourse',authenticate,adminCheck,async(req,res)=>{
    try{
        console.log(req.role);

        // const data = req.body;
        const {CourseName,CourseId,CourseType,Description,Price} = req.body;
        const result = await Course.findOne({courseName:CourseName}).exec();
        console.log(result);

        if(result){
            result.courseId=CourseId;
            result.courseType=CourseType;
            result.description=Description;
            result.price=Price;
            console.log(result);
            
            await result.save();
            res.status(201).send("Course successfully updated");
        }
        else{
            res.status(404).send("No such course exist");
        }

    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})

adminauth.patch('/editCourse',authenticate,adminCheck,async(req,res)=>{
    try{
   const {CourseName,CourseType,Price}= req.body;
   
   const result = await Course.findOne({courseName:CourseName});
   console.log(result);
   if(result){
    result.courseType=CourseType;
    result.price=Price;
    await result.save()
    res.status(200).json({msg:"Course successfully updated"});
   }
   else{
    res.status(404).send("Course not found");
   }}
   catch{
    res.status(500).send("Internal Server Error")
   }

})

adminauth.delete('/deleteCourse',authenticate,adminCheck,async(req,res)=>{
    try{
    const {courseName} = req.body;
    const result=await Course.findOne({courseName:courseName})
    console.log(result);
    if(result){

        await Course.findOneAndDelete({courseName:courseName});
        res.status(200).json({msg:"Course succesfully deleted"});
    }
    else{
        res.status(404).json({msg:"Course not found"});
    }}
    catch{
        res.status(500).json({msg:"Internal Server Error"})
    }

})

adminauth.get('/getAllCourses',async (req,res) => {
    try {
        const courses = await Course.find({});
        res.json(courses)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Internal Server Error"})
        
    }
})

export default adminauth;
