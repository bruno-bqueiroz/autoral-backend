import enrollRepository from "@/repositories/enroll-repositories";
import { EnrollBody } from "@/protocols";
import { notFoundError } from "../diario-service/errors";

export async function getEnroll(userId: number) {
     const data = await enrollRepository.findByuserId(userId);
     if(data === null || data[0] === null) throw notFoundError();
     return data;
}

export async function postEnroll(userId: number, body: EnrollBody) {
   const dataEnroll = await enrollRepository.createdByuserId(userId, body);
   if(dataEnroll === null || dataEnroll === undefined) throw notFoundError();
   return dataEnroll;
}

