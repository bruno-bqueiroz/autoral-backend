import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors"; 
import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import { diarioRouter, weekRouter, usersRouter, authenticationRouter, GoalRouter, enrollRouter } from "@/routers"; 

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/day", diarioRouter)
  .use("/week", weekRouter)
  .use("/goal", GoalRouter)
  .use("/enroll", enrollRouter)
  
  .use(handleApplicationErrors) ;

export function init(): Promise<Express> {
   connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;