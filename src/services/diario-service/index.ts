import diarioRepository from "@/repositories/diario-repositories";
import { notFoundError } from "./errors";
import { BodyDiary } from "@/protocols";

export async function getDiary(date :string, userId: number) {

     const data = await diarioRepository.findByDate(date, userId);
     if(data === null) throw notFoundError();
     
     return data;
  }

  export async function postDiary(date:string, body: BodyDiary, userId:number) {
   const data = await diarioRepository.insertByDate(date, body, userId);
   if(data === null) throw notFoundError();
   
   return data;
}

const diarioService = {
    getDiary,
    postDiary
  };

  export default diarioService;

