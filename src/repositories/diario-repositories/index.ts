import { prisma } from "@/config";
import { Prisma } from "@prisma/client";


async function findByDate(date: string) {
    
   
    return prisma.diario.findFirst({
        where:{date}
    })
  }


  const diarioRepository = {
    findByDate
  };
  
  export default diarioRepository;