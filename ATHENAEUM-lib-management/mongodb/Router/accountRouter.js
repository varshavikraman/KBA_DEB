import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import {user,book,borrow,returnBook} from "../Models/sample.js";

const accountRoute = Router();

accountRoute.post('/issueBook', authenticate, async (req, res) => {
    try {
        const { UserName, BookId, DateofIssue, DateofReturn } = req.body;

        const userData = await user.findOne({ userName: UserName });
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        const bookData = await book.findOne({ bookId: BookId });
        if (!bookData) {
            return res.status(404).json({ msg: "Book not found" });
        }

        const issueDate = DateofIssue ? new Date(DateofIssue) : new Date(); 
        const returnDate = DateofReturn ? new Date(DateofReturn) : null;

        if (isNaN(issueDate) || (returnDate && isNaN(returnDate))) {
            return res.status(400).json({ msg: "Invalid date format. Use YYYY-MM-DD." });
        }

        const newBorrowed = new borrow({
            userName: UserName,
            bookId: BookId,
            borrowDate: issueDate,
            returnDate: returnDate
        });

        await newBorrowed.save();

        res.status(201).json({ msg: "You have successfully borrowed the book", data: newBorrowed });
        console.log(newBorrowed);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


accountRoute.post('/returnBook', authenticate, async (req, res) => {
    try {
        const { UserName, BookId } = req.body;

        const borrowedBook = await borrow.findOne({ userName: UserName, bookId: BookId });

        if (!borrowedBook) {
            return res.status(404).json({ msg: "Borrow record not found" });
        }

        const newReturn = new returnBook({
            userName: borrowedBook.userName,
            bookId: borrowedBook.bookId,
            borrowDate: borrowedBook.borrowDate, 
            returnDate: new Date()
        });

        await newReturn.save();

        await borrow.deleteOne({ _id: borrowedBook._id });

        res.status(200).json({msg: "Book returned successfully",data: { newReturn},});
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


export {accountRoute};



