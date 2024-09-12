import { Router } from "express";
 import { authenticateToken } from "@/middlewares";
import { diaryGet, diaryPost } from "@/controllers"; 

const diarioRouter = Router();

diarioRouter
    .get("",authenticateToken, diaryGet)
    .post("", authenticateToken, diaryPost)



export {diarioRouter}