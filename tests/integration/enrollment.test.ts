import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
/* import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
} from "../factories"; */
import {/* , generateValidToken */ } from "../helpers";

beforeAll(async () => {
  await init();
});


const server = supertest(app);

describe("POST /enroll", () => {
 
    it("should respond with status 400 if body is missing", async () => {
      const response = await server.post("/enroll?userId=1");
  
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 401 if userId is missing", async () => {
      const response = await server.post("/enroll");
  
      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

      it("should respond with status 200 and data", async () => {
        const response = await server.post("/enroll?userId=1").send([{
          "name": 'Teste 2',
          "cpf": '05871853170',
          "userId": 1,
          "city": 'Cuiabá',
          "state": 'MT'
        },
        {
            "marca":"Hyundai",
            "modelo": "HB20",
            "ano": 2022,
        }]);

        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              cpf: expect.any(String),
              userId: expect.any(Number),
              state: expect.any(String),
              }),
            expect.objectContaining({
              id: expect.any(Number),
              marca: expect.any(String),
              modelo: expect.any(String),
              ano: expect.any(Number),
              userId: expect.any(Number)
            })
          ])
        ) 
      }); 

}); 

describe("GET /enroll", () => {
    it("should respond with status 401 if not have userId", async () => {
      const response = await server.get("/enroll");

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 400 if not have enroll", async () => {
      const response = await server.get("/enroll?userId=22");

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200 and data", async () => {
    
      const response = await server.get("/enroll?userId=1");
      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            cpf: expect.any(String),
            userId: expect.any(Number),
            state: expect.any(String),
            }),
          expect.objectContaining({
            id: expect.any(Number),
            marca: expect.any(String),
            modelo: expect.any(String),
            ano: expect.any(Number),
            userId: expect.any(Number)
          })
        ])
      )
  }); 

});