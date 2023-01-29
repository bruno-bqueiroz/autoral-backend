import { Router } from "express";
 
import { diaryGet, diaryPost } from "@/controllers"; 

const diarioRouter = Router();

diarioRouter
    .get("", diaryGet)
    .post("", diaryPost)



export {diarioRouter}