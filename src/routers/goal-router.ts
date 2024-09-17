import { Router } from "express";
 
import { goalGet, goalPost } from "@/controllers"; 
import { authenticateToken } from "@/middlewares";

const GoalRouter = Router();

GoalRouter
    .get("", authenticateToken, goalGet)
    .post("", authenticateToken, goalPost)

export {GoalRouter}