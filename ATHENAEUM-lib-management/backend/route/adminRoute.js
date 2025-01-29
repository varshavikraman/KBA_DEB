import { Router } from "express";
import authenticate from "../middleware/auth.js";
import adminCheck from "../middleware/adminAuth.js";


const adminrRoute = Router();

const book = new Map();

adminrRoute.post('/addBook',authenticate,adminCheck,(req,res)=>{
    try{
        const {BookTitle,Author,Publisher,BookId,YearOfPublication,NumberOfCopies,Language} = req.body;
        if(book.get(BookTitle)){
            res.status(400).json({msg :`${BookTitle} already exist`});
        }else{
            book.set(BookTitle,{Author,Publisher,BookId,YearOfPublication,NumberOfCopies,Language});
            res.status(201).json({msg: `${BookTitle} added successfully`})
            console.log(book.get(BookTitle))
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
})
    

 
export {adminrRoute}
