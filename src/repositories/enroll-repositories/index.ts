import { prisma } from "@/config";
import { EnrollBody } from "@/protocols";


async function findByuserId(userId: number) {
    
    const enroll = await prisma.enrollment.findUnique({
        where: {
            userId:userId,
        }
    })

    const goal = await prisma.goal.findUnique({
      where: {
          userId:userId,
      }
  })
    console.log("🚀 ~ findByuserId ~ goal:", goal)
  
    const veiculo = await prisma.veiculo.findUnique({
        where: {
            userId:userId,
        }
    })
    return [enroll, goal, veiculo];
}

async function createdByuserId(userId: number, body: EnrollBody) {
  console.log("🚀 ~ file: index.ts:21 ~ createdByuserId ~ body:", body)
  
    const enroll = await prisma.enrollment.upsert({
        where: {
            userId: userId || 0,    
          },
          create: {
            name: body[0].name,
            cpf: body[0].cpf,
            city: body[0].city ,
            state: body[0].state,
            userId: userId,
        },
        update: {
            name: body[0].name,
            cpf: body[0].cpf,
            city: body[0].city ,
            state: body[0].state,
            userId: userId,
        }
    });

    const existingGoal = await prisma.goal.findFirst({
        where: {
          userId: userId
        }
      });
      
      if (existingGoal) {
        console.log("🚀 ~ file: index.ts:50 ~ createdByuserId ~ existingGoal:", existingGoal)
        // Atualize o registro existente
        const updatedGoal = await prisma.goal.update({
          where: { id: existingGoal.id }, // Use a chave primária para atualização
          data: {
            meta: Number(body[0].meta),
            entrada: 0,
            month: 0,
          },
        });
      } else {
        console.log("nao existe meta criada")
        // Crie um novo registro
        const newGoal = await prisma.goal.create({
          data: {
            meta: Number(body[0].meta),
            entrada: 0,
            month: 0,
            userId: userId,
          },
        });
      }
      

    const veiculo = await prisma.veiculo.upsert({
        where: {
            userId: userId || 0,
          },
          create: {
            marca: body[1].marca,
            modelo: body[1].modelo,
            ano: body[1].ano,
            userId: userId,
        },
        update: {
            id: body[1].id,
            marca: body[1].marca,
            modelo: body[1].modelo,
            ano: body[1].ano,
            userId: userId,
        }
    })
    return [enroll, veiculo];
}

const enrollRepository = {
    findByuserId,
    createdByuserId
  };
  
  export default enrollRepository;