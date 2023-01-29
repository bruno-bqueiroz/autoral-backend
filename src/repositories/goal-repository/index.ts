import { prisma } from "@/config";


async function findByuserId(userId: number) {
    return prisma.diario.findFirst({
      where: {userId:userId}
    });
}


  const goalRepository = {
    findByuserId
  };
  
  export default goalRepository;