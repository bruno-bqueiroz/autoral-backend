import { Router } from "express";
 
import { weekGet, weekPost } from "@/controllers"; 

const weekRouter = Router();

weekRouter
    .get("", weekGet)
    .post("", weekPost)

export {weekRouter}