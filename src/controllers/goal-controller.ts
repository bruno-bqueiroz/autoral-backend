import { Request, Response } from "express";
import httpStatus from "http-status";
import { getGoal, postGoal } from "@/services";
import { BodyGoals } from "@/protocols";

export async function goalGet(req: Request, res: Response) {
    
    const userId: number = Number(req.query.userId) //req.userId
    if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
    const month: number = Number(req.query.month);
    if(!month ) return res.sendStatus(httpStatus.BAD_REQUEST);
    try {
      const data = await getGoal(userId, month);
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "notFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_GATEWAY).send(error);
    }
}

export async function goalPost(req: Request, res: Response) {
    
  const userId: number = Number(req.query.userId) //req.userId
  if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
  const month: number = Number(req.query.month);
    if(!month ) return res.sendStatus(httpStatus.BAD_REQUEST);
  const body = req.body as BodyGoals;
  try {
    const data = await postGoal(userId, month, body);
    
    return res.status(httpStatus.NO_CONTENT).send(data);
  } catch (error) {
    if (error.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}