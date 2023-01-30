import diarioService from "@/services/diario-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { BodyDiary } from "@/protocols";

export async function diaryGet(req: Request, res: Response) {
    const {date}  = req.query;

    if(!date || date == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
  
    try {
      const data = await diarioService.getDiary(String(date));
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "NotoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

  export async function diaryPost(req: Request, res: Response) {
    const {date}  = req.query;
    if(!date || date == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    const body = req.body as BodyDiary;

    //if(!body || body == undefined) return res.sendStatus(httpStatus.BAD_REQUEST);
    
    try {
      const data = await diarioService.postDiary(String(date), body);
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "NotoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

  