import { prisma } from "@/config";
import { BodyGoals } from "@/protocols";


async function findByuserId(userId: number, month: number) {
  
  const goalWithEntries = await prisma.goal.findFirst({
    where: {
        userId: userId,
        month: month
    },
    select: {
        id: true,
        meta: true,
        entrada: true, // Este é o campo que você já tem no banco
        userId: true,
        month: true,
        // Faz a soma das entradas do mês
    }
    
  });

  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0];

const totalEntries = await prisma.diario.aggregate({
    _sum: {
        entrada: true
    },
    where: {
        userId: userId,
        date: {
            gte: startDate,
            lt: endDate
        }
    }
});


    return {
      ...goalWithEntries,
      entrada: totalEntries._sum.entrada || 0 // Caso não tenha entradas, retorne 0
    };
   
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