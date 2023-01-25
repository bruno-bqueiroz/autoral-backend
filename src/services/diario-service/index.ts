import diarioRepository from "@/repositories/diario-repositories";

export async function getDiario({ date }:any) {
  
    return diarioRepository.findByDate(date);
  }

const diarioService = {
    getDiario,
  };

  export default diarioService;

