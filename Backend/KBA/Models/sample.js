import {Schema} from "mongoose";
import { model } from "mongoose";

const demo = new Schema({
    FirstName:{type:String,required:true},
    LastName:String,
    UserName:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    UserRole:{type:String,required:true}
});
const sample = model('user',demo);

const course = new Schema({
    image:String,
    CourseName:{type:String,required:true,unique:true},
    CourseId:{type:String,required:true},
    CourseType:{type:String,required:true},
    Description:String,
    Price:{type:Number,required:true}
});
const sample1 = model('courseDetail',course);

export  {sample,sample1}

