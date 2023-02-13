import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { diaryGet, diaryPost } from "@/controllers"; 

const diarioRouter = Router();

diarioRouter
    .all("/*", authenticateToken)
    .get("", diaryGet)
    .post("", diaryPost)



export {diarioRouter}