import goalRepository from "@/repositories/goal-repository";
import { notFoundError } from ".././diario-service/errors";

export async function getGoal(userId: number) {
     const data = await goalRepository.findByuserId(userId);
     if(data === null) throw notFoundError();
     return data;
  }