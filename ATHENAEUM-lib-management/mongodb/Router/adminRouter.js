import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminAuth.js";
import { book } from "../Models/sample.js";
import upload from "../Middleware/upload.js";
import sharp from "sharp";


const adminRoute = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminRoute.post('/addBook',authenticate,adminCheck,upload.single("bookImage"),async(req,res)=>{
    try{
        const {BookTitle,Author,BookId,Publisher,YearOfPublication,NumberOfCopies,Language} = req.body;
        const Books = await book.findOne({bookId:BookId});
        if(Books){
            res.status(400).json({msg :`${BookTitle} already exist`});
        }else{
            let ImageFile = "";
            if (req.file) {
                ImageFile = convertToBase64(req.file.buffer);
            }
            const newBook = new book ({   
                image:ImageFile,
                bookTitle:BookTitle ,
                author:Author,
                bookId:BookId,
                publisher:Publisher,
                yearOfPublication:YearOfPublication,
                numberOfCopies:NumberOfCopies,
                language:Language
            });
            await newBook.save();
            res.status(201).json({msg: `${BookTitle} added successfully`})
            console.log(newBook)
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

adminRoute.get('/getBook',async(req,res)=>{
    try{
        const bId = req.query.bookId;
        console.log(bId);

        const bookdetails = await book.findOne({bookId:bId});
        if (bookdetails) {
            const imageBuffer = Buffer.from(bookdetails.image, "base64");
      
            res.status(201).json({data:bookdetails})
                
        }
        else{
            res.status(404).json({msg:"No such event available"});
        }
    }      
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})

adminRoute.patch('/updateBook',authenticate,adminCheck,async(req,res)=>{
    try{
        const {BookId,NumberOfCopies,Language} = req.body;
        const result = await book.findOne({bookId:BookId})
            if(result){
                result.bookId = BookId,
                result.numberOfCopies = NumberOfCopies,
                result.language = Language

                await result.save();

                res.status(201).json({msg: `${result.bookTitle} updated successfully`})
                console.log()
            }else{
                res.status(400).json({msg :`${result.bookTitle} doesn't exist`}); 
            }
    }
    catch (error) {
        console.error(result);
        res.status(500).send("Internal Server Error");
    }
})
    
adminRoute.delete('/deleteBook', authenticate, adminCheck, async (req, res) => {
    try {
        const { BookId } = req.body;
        console.log("Deleting book with ID:", BookId);

        const result = await book.findOne({ bookId: BookId });

        if (!result) {
            return res.status(404).json({ msg: `Book with ID ${BookId} does not exist` });
        }

        await book.findOneAndDelete({ bookId: BookId });

        res.status(200).json({ msg: `${result.bookTitle} has been deleted successfully` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export {adminRoute}

