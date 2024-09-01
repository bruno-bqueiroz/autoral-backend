import diarioRepository from "@/repositories/diario-repositories";
import { notFoundError } from "./errors";
import { BodyDiary } from "@/protocols";

export async function getDiary(date :string) {

     const data = await diarioRepository.findByDate(date);
     console.log("dados do diario", data);
     if(data === null) throw notFoundError();
     
     return data;
  }

  export async function postDiary(date:string, body: BodyDiary) {
   const data = await diarioRepository.insertByDate(date, body);
   if(data === null) throw notFoundError();
   
   return data;
}

const diarioService = {
    getDiary,
    postDiary
  };

  export default diarioService;

