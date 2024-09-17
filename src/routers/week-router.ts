import { Router } from "express";
 
import { weekGet, weekPost } from "@/controllers"; 
import { authenticateToken } from "@/middlewares";

const weekRouter = Router();

weekRouter
    .get("", authenticateToken, weekGet)
    .post("", authenticateToken, weekPost)

export {weekRouter}