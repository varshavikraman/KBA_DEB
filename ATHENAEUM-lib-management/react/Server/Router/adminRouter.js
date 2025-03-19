import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminAuth.js";
import { user,book,borrow,returnBook } from "../Models/sample.js";
import upload from "../Middleware/upload.js";

const adminRoute = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64");
};

adminRoute.post('/addBook', authenticate, adminCheck, upload.single("bookImage"), async (req, res) => {
    try {
        const { BookTitle, Author, Description, BookId, Publisher, YearOfPublication, NumberOfCopies } = req.body;
        const Books = await book.findOne({ bookId: BookId });
        if (Books) {
            res.status(400).json({ msg: `${BookTitle} already exists` });
        } else {
            let ImageFile = "";
            if (req.file) {
                ImageFile = convertToBase64(req.file.buffer);
            }
            const newBook = new book({
                image: ImageFile,
                bookTitle: BookTitle,
                author: Author,
                description: Description,
                bookId: BookId,
                publisher: Publisher,
                yearOfPublication: new Date(YearOfPublication), 
                numberOfCopies: NumberOfCopies,
            });
            await newBook.save();
            res.status(201).json({ msg: `${BookTitle} added successfully` });
            console.log(newBook);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg:"Internal Server Error"});
    }
});

adminRoute.get('/getAllBooks', async (req, res) => {
    try {
        const bookDatas = await book.find();
        console.log("Fetched Books:", bookDatas); 
        res.json(bookDatas);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.get('/getBook', async (req, res) => {
    try {
        let title = req.query.bookTitle;
        console.log("Requested book:", `"${title}"`);

        if (!title) {
            return res.status(400).json({ msg: "Book title is required" });
        }

        const result = await book.findOne({ bookTitle: title }); 
        if (!result) {
            return res.status(404).json({ msg: "No such book available" });
        }

        res.status(200).json({
            imageUrl: `/api/getBookImage?bookTitle=${encodeURIComponent(title)}`,
            bookTitle: result.bookTitle,
            author: result.author,
            description: result.description,
            bookId: result.bookId,
            publisher: result.publisher,
            yearOfPublication: result.yearOfPublication,
            numberOfCopies: result.numberOfCopies,
        });

    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.get('/getBookImage', async (req, res) => {
    try {
        let title = req.query.bookTitle;
        console.log("Requested Book Title:", `"${title}"`);

        if (!title) {
            return res.status(400).json({ msg: "Book Title is required" });
        }

        const bookDetails = await book.findOne({ bookTitle: title });

        if (!bookDetails || !bookDetails.image) {
            return res.status(404).json({ msg: `No image available for book: ${title}` });
        }

        res.set("Content-Type", "image/jpeg");
        res.send(Buffer.from(bookDetails.image, "base64"));

    } catch (error) {
        console.error("Error fetching book image:", error.message);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

adminRoute.patch('/updateBook',authenticate,adminCheck,async(req,res)=>{
    try{
        const {BookId,NumberOfCopies} = req.body;
        const result = await book.findOne({bookId:BookId})
            if(result){
                result.bookId = BookId,
                result.numberOfCopies = NumberOfCopies,

                await result.save();

                res.status(201).json({msg: `${result.bookTitle} updated successfully`})
                console.log()
            }else{
                res.status(400).json({msg :`${result.bookTitle} doesnot exist`}); 
            }
    }
    catch (error) {
        console.error(result);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
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
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

adminRoute.post('/issueBook', authenticate, adminCheck, async (req, res) => {
    try {
        const { BookId, DateofIssue, DateofReturn } = req.body;
        const UserName = req.Name; 

        if (!UserName) {
            return res.status(401).json({ msg: "Unauthorized: User not found" });
        }

        const userData = await user.findOne({ userName: UserName });
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        const bookData = await book.findOne({ bookId: BookId });
        if (!bookData) {
            return res.status(404).json({ msg: "Book not found" });
        }

        if (bookData.numberOfCopies <= 0) {
            return res.status(400).json({ msg: "No copies available for borrowing" });
        }

        const issueDate = new Date(DateofIssue);
        const returnDate = new Date(DateofReturn);

        if (isNaN(issueDate.getTime())) {
            return res.status(400).json({ msg: "Invalid issue date format. Use YYYY-MM-DD." });
        }

        if (isNaN(returnDate.getTime())) {
            return res.status(400).json({ msg: "Invalid return date format. Use YYYY-MM-DD." });
        }

        const newBorrowed = new borrow({
            user: userData.userName,
            book: bookData._id,
            borrowDate: issueDate,
            returnDate: returnDate
        });

        await newBorrowed.save();
        await book.updateOne({ _id: bookData._id }, { $inc: { numberOfCopies: -1 } });

        res.status(201).json({ msg: "Book borrowed successfully!", data: newBorrowed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

adminRoute.post('/returnBook', authenticate, adminCheck, async (req, res) => {
    try {
        const { UserName, BookId } = req.body;

        const userData = await user.findOne({ userName: UserName });
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        const bookData = await book.findOne({ bookId: BookId });
        if (!bookData) {
            return res.status(404).json({ msg: "Book not found" });
        }

        const borrowedBook = await borrow.findOne({ user: userData.userName, book: bookData._id });

        if (!borrowedBook) {
            return res.status(404).json({ msg: "Borrow record not found" });
        }

        const newReturn = new returnBook({
            userName: userData.userName,
            bookId: bookData.bookId, 
            borrowDate: borrowedBook.borrowDate, 
            returnDate: new Date()
        });

        await newReturn.save();

        await borrow.deleteOne({ _id: borrowedBook._id });

        await book.updateOne({ _id: bookData._id }, { $inc: { numberOfCopies: 1 } });

        res.status(200).json({ msg: "Book returned successfully", data: newReturn });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



export {adminRoute}

