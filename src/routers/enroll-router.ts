import { Router } from "express";
 
import { enrollGet, enrollPost } from "@/controllers"; 
import { authenticateToken } from "@/middlewares";

const enrollRouter = Router();

enrollRouter
    .get("", authenticateToken, enrollGet)
    .post("", authenticateToken, enrollPost)



export {enrollRouter}