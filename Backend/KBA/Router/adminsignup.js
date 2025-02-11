import {Router} from "express"

const adminSignup = Router();

adminSignup.post('/signup',(req,res)=>{
    console.log("admin signup")
})
/* adminSignup.post('/addCourse',(req,res)=>{
    
    })*/

 export {adminSignup}