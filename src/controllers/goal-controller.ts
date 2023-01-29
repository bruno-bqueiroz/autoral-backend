import { Request, Response } from "express";
import httpStatus from "http-status";
import { getGoal } from "@/services";

export async function goalGet(req: Request, res: Response) {
    
    const userId: number = Number(req.query.userId) //req.userId
    if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
  
    try {
      const data = await getGoal(userId);
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "NotoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }