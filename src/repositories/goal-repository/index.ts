import { prisma } from "@/config";
import { BodyGoals } from "@/protocols";


async function findByuserId(userId: number, month: number) {
    
    return prisma.goal.findFirst({
      where: {userId:userId, month:month}
    });
}

async function postByuserId(userId: number, month: number, body: BodyGoals) {
    
  return prisma.goal.create({
    data: {
      userId: userId,
      meta: body.meta,
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