import diarioService from "@/services/diario-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { BodyDiary } from "@/protocols";

export async function diaryGet(req: any, res: Response) {
    const {date}  = req.query;
    console.log("🚀 ~ diaryGet ~ req:", req)
    const userId = req.user.userId;
    console.log("🚀 ~ diaryGet ~ userId:", userId)
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

  export async function diaryPost(req: any, res: Response) {
    const {date}  = req.query;
    if(!date || date == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    const body = req.body as BodyDiary;
    const userId = req.user.userId;
    //if(!body || body == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    
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

  