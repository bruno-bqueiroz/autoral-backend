import { prisma } from "@/config";
import { EnrollBody } from "@/protocols";


async function findByuserId(userId: number) {
    
    const enroll = await prisma.enrollment.findUnique({
        where: {
            userId:userId,
        }
    })
    const veiculo = await prisma.veiculo.findUnique({
        where: {
            userId:userId,
        }
    })
    return [enroll, veiculo];
}

async function createdByuserId(userId: number, body: EnrollBody) {
    
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