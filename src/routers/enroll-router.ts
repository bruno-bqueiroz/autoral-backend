import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { enrollGet, enrollPost } from "@/controllers"; 

const enrollRouter = Router();

enrollRouter
    .all("/*", authenticateToken)
    .get("", enrollGet)
    .post("", enrollPost)



export {enrollRouter}