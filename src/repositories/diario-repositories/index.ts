import { prisma } from "@/config";
import { BodyDiary } from "@/protocols";
import { Prisma } from "@prisma/client";
import { UPGRADE_REQUIRED } from "http-status";
import { userInfo } from "os";


async function findByDate(date: string, userId:number) {

    return prisma.diario.findFirst({
      where: {date:date, userId: userId}

    })
  
  }
  async function insertByDate(date: string, body: BodyDiary, userId:number) {

    return prisma.diario.upsert({
      where: {
        id: body.id || 0,
      },
      create: {
        entrada:body.entrada,
        saida: body.saida,
        horasTrabalhadas: body.horasTrabalhadas,
        KmPercorridos: body.KmPercorridos,
        NumeroViagens: body.NumeroViagens,
        date:date,
        userId:userId
      },
      update: {
        entrada:body.entrada,
        saida: body.saida,
        horasTrabalhadas: body.horasTrabalhadas,
        KmPercorridos: body.KmPercorridos,
        NumeroViagens: body.NumeroViagens,
        date:date,
        userId:userId
      }
    })
   
  }

  const diarioRepository = {
    findByDate,
    insertByDate
  };
  
  export default diarioRepository;