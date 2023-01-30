import goalRepository from "@/repositories/goal-repository";
import { notFoundError } from ".././diario-service/errors";
import { BodyGoals } from "@/protocols";

export async function getGoal(userId: number, month: number) {
     const data = await goalRepository.findByuserId(userId, month);
     if(data === null) throw notFoundError();
     return data;
  }

  export async function postGoal(userId: number, month: number, body: BodyGoals) {
   const data = await goalRepository.postByuserId(userId, month, body);
   if(data === null) throw notFoundError();
   return data;
}