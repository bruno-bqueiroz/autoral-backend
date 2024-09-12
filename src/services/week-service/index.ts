import weekRepository from "@/repositories/week-repository";
import { notFoundError } from "../diario-service/errors";
import { BodyGoals } from "@/protocols";

export async function getWeek(userId: number, startOfWeek: Date, endOfWeek:Date) {
     const data = await weekRepository.findByuserId(userId, startOfWeek, endOfWeek);
     if(data === null) throw notFoundError();
     
     return data;
  }

  export async function postWeek(userId: number, month: number, body: BodyGoals) {
   const data = await weekRepository.postByuserId(userId, month, body);
   if(data === null) throw notFoundError();
   return data;
}