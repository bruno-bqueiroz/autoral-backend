import { Router } from "express";
 
import { diarioGet } from "@/controllers"; 

const diarioRouter = Router();

diarioRouter.get("/", diarioGet);


export {diarioRouter}