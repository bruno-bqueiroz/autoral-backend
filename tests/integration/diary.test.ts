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

describe("GET /day", () => {

  it("should respond with status 400 if query param date is missing", async () => {
    const response = await server.get("/day");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
  
  it("should respond with status 400 when user has no diary for this day", async () => {
    const response = await server.get("/day?date=2023-01-32");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 200 and data", async () => {
    const response = await server.get("/day?date=2023-01-24");

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          entrada: expect.any(Number),
          saida: expect.any(Number),
          horasTrabalhadas: expect.any(Number),
          KmPercorridos: expect.any(Number),
          NumeroViagens: expect.any(Number),
          date: expect.any(String),
          userId: expect.any(Number),
        })
    )
  });
});

describe("POST /day", () => {
  describe("new day", () => {

  it("should respond with status 400 if query param date is missing", async () => {
    const response = await server.post("/day");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
  
  it("should respond with status 400 if query param date is of wrong format", async () => {
    const response = await server.post("/day?date=2023/01/24");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if body is missing", async () => {
    const response = await server.post("/day?date=2023-01-25");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 200 and data", async () => {
    const response = await server.post("/day?date=2023-01-27").send({
      "entrada": 333,
      "saida": 111,
      "horasTrabalhadas": 11,
      "KmPercorridos": 222,
      "NumeroViagens": 22,
      "userId": 1
    });

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          entrada: expect.any(Number),
          saida: expect.any(Number),
          horasTrabalhadas: expect.any(Number),
          KmPercorridos: expect.any(Number),
          NumeroViagens: expect.any(Number),
          date: expect.any(String),
          userId: expect.any(Number),
        })
    )
  }); 

})

describe("update day", () => {

  it("should respond with status 400 if query param date is missing", async () => {
    const response = await server.post("/day");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });
  
  it("should respond with status 400 if query param date is of wrong format", async () => {
    const response = await server.post("/day?date=2023/01/24");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if body is missing", async () => {
    const response = await server.post("/day?date=2023-01-25");

    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 200 and data", async () => {
    const response = await server.post("/day?date=2023-01-26").send({
      "entrada": 333,
      "saida": 111,
      "horasTrabalhadas": 11,
      "KmPercorridos": 222,
      "NumeroViagens": 22,
      "userId": 1
    });

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          entrada: expect.any(Number),
          saida: expect.any(Number),
          horasTrabalhadas: expect.any(Number),
          KmPercorridos: expect.any(Number),
          NumeroViagens: expect.any(Number),
          date: expect.any(String),
          userId: expect.any(Number),
        })
    )
  }); 

})

});


/* {
  id: 41,
  entrada: 333,
  saida: 111,
  horasTrabalhadas: 11,
  KmPercorridos: 222,
  NumeroViagens: 22,
  date: '2023-01-26',
  userId: 1
}
 */