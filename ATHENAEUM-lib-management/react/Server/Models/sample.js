import {Schema} from "mongoose";
import { model } from "mongoose";


const userSchema = new Schema({
    name:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userRole:{type:String,required:true}
});
const user = model('UserDetail',userSchema);

const bookSchema = new Schema({
    image:String,
    bookTitle:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String,required:true},
    bookId:{type:String,required:true,unique:true},
    publisher:{type:String,required:true},
    yearOfPublication:Date,
    numberOfCopies:{type:Number,required:true},
});
const book = model('BookDetail',bookSchema );

const borrowSchema = new Schema({
    userName: { type: String, required: true },
    book: { type: Schema.Types.ObjectId, ref: 'BookDetail', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});

const borrow = model('BorrowDetail', borrowSchema);;

const returnSchema = new Schema({
    userName: { type: String, required: true }, 
    bookId: { type: String, required: true }, 
    borrowDate: { type: Date, required: true },
    expiry :{},
    returnDate: { type: Date, default: Date.now },
});

const returnBook = model('ReturnBookDetail', returnSchema);

export  {user,book,borrow,returnBook}