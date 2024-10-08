import { Request, Response } from "express";
import httpStatus from "http-status";
import { getEnroll, postEnroll } from "@/services";
import { EnrollBody } from "@/protocols";
import { type } from "os";
import { Console } from "console";

export async function enrollGet(req: any, res: Response) {

  const userId = req.user.userId;
  if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
    
    try {
      const data = await getEnroll(userId);
      
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "notFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function enrollPost(req: any, res: Response) {
  
  const userId = req.user.userId;
  if(!userId ) return res.sendStatus(httpStatus.UNAUTHORIZED);
  const body = req.body;
  if(body[1] === undefined) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const data = await postEnroll(userId, body as EnrollBody);
    
    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if (error.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}


