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
import { cleanDb/* , generateValidToken */ } from "../helpers";

beforeAll(async () => {
  await init();
});


const server = supertest(app);

describe("POST /enroll", () => {
 
    it("should respond with status 400 if body is missing", async () => {
      const response = await server.post("/enroll");
  
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if body is of wrong format", async () => {
        const response = await server.post("/enroll");
    
        expect(response.status).toEqual(httpStatus.BAD_REQUEST);
      });

      it("should respond with status 200 and data", async () => {
        const response = await server.post("/enroll").send([{
          "name": 333,
          "cpf": 111,
          "userId": 1,
          "city": 11,
          "state": 222
        },
        {
            "marca":"Hyundai",
            "modelo": "HB20",
            "Ano": 2022,
            "userId": 1
        }]);

        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toContain({}); 
      }); 

});

describe("GET /enroll", () => {
 
    it("should respond with status 404 if not have enroll", async () => {
      const response = await server.get("/enroll");
  
      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

      it("should respond with status 200 and data", async () => {
        const response = await server.get("/enroll");

        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual([{
            "name": 333,
            "cpf": 111,
            "userId": 1,
            "city": 11,
            "state": 222
          },
          {
              "marca":"Hyundai",
              "modelo": "HB20",
              "Ano": 2022,
              "userId": 1
          }]); 
      }); 

});