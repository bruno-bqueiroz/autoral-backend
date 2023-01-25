import diarioService from "@/services/diario-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function diarioGet(req: Request, res: Response) {
    const { date } = req.query;
  
    try {
      const data = await diarioService.getDiario(date);
      return res.status(httpStatus.OK).send(data);
    } catch (error) {
      if (error.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send(error);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }