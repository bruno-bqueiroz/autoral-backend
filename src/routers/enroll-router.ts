import { Router } from "express";
 
import { enrollGet, enrollPost } from "@/controllers"; 

const enrollRouter = Router();

enrollRouter
    .get("", enrollGet)
    .post("", enrollPost)



export {enrollRouter}