import { Router } from "express";
 
import { goalGet, diaryPost } from "@/controllers"; 

const GoalRouter = Router();

GoalRouter
    .get("", goalGet)
    //.post("", diaryPost)



export {GoalRouter}