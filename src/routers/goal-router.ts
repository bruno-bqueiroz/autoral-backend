import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { goalGet, goalPost } from "@/controllers"; 

const GoalRouter = Router();

GoalRouter
    .all("/*", authenticateToken)
    .get("", goalGet)
    .post("", goalPost)



export {GoalRouter}