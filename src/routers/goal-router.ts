import { Router } from "express";
 
import { goalGet, goalPost } from "@/controllers"; 

const GoalRouter = Router();

GoalRouter
    .get("", goalGet)
    .post("", goalPost)



export {GoalRouter}