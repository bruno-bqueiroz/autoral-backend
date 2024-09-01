import { prisma } from "@/config";
import { BodyGoals } from "@/protocols";


async function findByuserId(userId: number, startOfWeek: Date, endOfWeek:Date) {

    const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
    const endOfWeekStr = endOfWeek.toISOString().split('T')[0];
    console.log("🚀 ~ findByuserId ~ endOfWeekStr:", endOfWeekStr)
    
    return await prisma.diario.findMany({
      where: {
          userId: userId,
          date: {
              gte: startOfWeekStr,
              lte: endOfWeekStr
          }
      },
      select: {
          date: true,
          entrada: true,
          saida: true
      },
      orderBy: {
          date: 'asc'
      }
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


  const weekRepository = {
    findByuserId,
    postByuserId
  };
  
  export default weekRepository;