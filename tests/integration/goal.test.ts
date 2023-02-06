import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import { when } from "joi";
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


describe("post goal", () => {
  it("should respond with status 400 if body is missing", async () => {
      const response = await server.post("/goal?userId=1&month=1");
  
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
    
    it("should respond with status 401 if not data", async () => {
      const response = await server.post("/goal");
  
      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 400 if query params month is missing", async () => {
      const response = await server.post("/goal?userId=1");
  
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
    
    it("should respond with status 204", async () => {
      const response = await server.post("/goal?userId=1&month=1").send({
          "meta": 4000,
          "entrada": 0,
      });
  
      expect(response.status).toEqual(httpStatus.NO_CONTENT);
    });
});


describe ("GET /goal", ()=>{
      
      it("should respond with status 404 when user has no goal for this month", async () => {
        const response = await server.get("/goal?userId=1&month=2");

        expect(response.status).toEqual(httpStatus.NOT_FOUND);
      });
    
      it("should respond with status 200 and data", async () => {
        const response = await server.get("/goal?userId=1&month=1");
    
        expect(response.status).toEqual(httpStatus.OK);
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            meta: expect.any(Number),
            entrada: expect.any(Number),
            month: expect.any(Number),
          })
      )
      });
});

