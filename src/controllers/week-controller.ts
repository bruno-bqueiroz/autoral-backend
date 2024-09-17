import { Request, Response } from "express";
import httpStatus from "http-status";
import { getWeek, postWeek } from "@/services/week-service";

export async function weekGet(req: any, res: Response) {
    
    const userId = req.user.userId;

    if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Segunda-feira
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)); // Domingo
    try {
      const data = await getWeek(userId, startOfWeek, endOfWeek);
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "notFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_GATEWAY).send(error);
    }
}

export async function weekPost(req: Request, res: Response) {
    
  // const userId: number = Number(req.query.userId) //req.userId
  // if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
  // const month: number = Number(req.query.month);
  //   if(!month ) return res.sendStatus(httpStatus.BAD_REQUEST);
  // const body = req.body as BodyGoals;
  // try {
  //   const data = await postGoal(userId, month, body);
    
  //   return res.status(httpStatus.NO_CONTENT).send(data);
  // } catch (error) {
  //   if (error.name === "notFoundError") {
  //     return res.status(httpStatus.NOT_FOUND).send(error.message);
  //   }
  //   return res.status(httpStatus.BAD_REQUEST).send(error);
  // }
}