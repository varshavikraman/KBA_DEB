import express, {json} from "express";
import dotenv from "dotenv";
import routes from "./route.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(json());

app.use('/',routes)

app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});

mongoose.connect('mongodb://localhost:27017/Demo')