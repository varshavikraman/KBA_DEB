import { Router } from "express";
import sample from "./Model/sample.js";

const routes = Router();
routes.post('/create',async (req,res)=>{
    try {
        const data = req.body;
        const result = await sample.create(data);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
})

routes.get('/read',async (req,res)=>{
    try {
        const result = await sample.findById('67a320276a3e0833019ea1bc');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json();
    }
})

export default routes