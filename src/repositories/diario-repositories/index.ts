import { prisma } from "@/config";
import { BodyDiary } from "@/protocols";
import { Prisma } from "@prisma/client";
import { UPGRADE_REQUIRED } from "http-status";


async function findByDate(date: string) {

    return prisma.diario.findFirst({
      where: {date:date}
    })
  
  }
  async function insertByDate(date: string, body: BodyDiary) {

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
        userId:body.userId
      },
      update: {
        entrada:body.entrada,
        saida: body.saida,
        horasTrabalhadas: body.horasTrabalhadas,
        KmPercorridos: body.KmPercorridos,
        NumeroViagens: body.NumeroViagens,
        date:date,
        userId:body.userId
      }
    })
   
  }

  const diarioRepository = {
    findByDate,
    insertByDate
  };
  
  export default diarioRepository;