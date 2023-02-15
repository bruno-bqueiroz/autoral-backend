import { AuthenticatedRequest } from "@/middlewares";
import diarioService from "@/services/diario-service";
import { Response } from "express";
import httpStatus from "http-status";
import { BodyDiary } from "@/protocols";

export async function diaryGet(req: AuthenticatedRequest, res: Response) {
    const {date}  = req.query;
    const { userId } = req;
    console.log(userId)

    if(!date || date == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
  
    try {
      const data = await diarioService.getDiary(String(date), userId);
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "NotoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

  export async function diaryPost(req: AuthenticatedRequest, res: Response) {
    const {date}  = req.query;
    const { userId } = req;
    console.log(userId)
    if(!date || date == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    const body = req.body as BodyDiary;
    
    if(!body || body == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    
    try {
      const data = await diarioService.postDiary(String(date), body, userId);
     
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "NotoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

  