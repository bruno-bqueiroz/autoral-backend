import { invalidDataError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "body");
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, "params");
}

function validate(schema: ObjectSchema, type: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

const jwt = require('jsonwebtoken');

export function authenticateToken(req: any, res: { sendStatus: (arg0: number) => any; }, next: () => void) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token "Bearer token"
  console.log("🚀 ~ authenticateToken ~ token:", token)
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    console.log("passou")
    req.user = user; // Coloca os dados do usuário no request
    next(); // Passa para a próxima função
  });
}



type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;