import { prisma } from "@/config";
import { BodyGoals } from "@/protocols";


async function findByuserId(userId: number, month: number) {
    
    return prisma.goal.findFirst({
      where: {userId:userId, month:month}
    });
}

async function postByuserId(userId: number, month: number, body: BodyGoals) {
    
  return prisma.goal.upsert({
    where: {
      id: body.id || 0,
    },
      create: {
      userId: userId,
      meta: Number(body.meta),
      entrada: body.entrada,
      month: month
    },
    update: {
      userId: userId,
      meta: Number(body.meta),
      entrada: body.entrada,
      month: month
    }
  });
  
}


  const goalRepository = {
    findByuserId,
    postByuserId
  };
  
  export default goalRepository;