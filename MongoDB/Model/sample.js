import {Schema} from "mongoose";
import { model } from "mongoose";

const demo = new Schema({
    userId:{type:String,required:true},
    name:{type:String,required:true},
    dob:{type:String,required:true}
});

const sample = model ('sample1',demo);
export default sample