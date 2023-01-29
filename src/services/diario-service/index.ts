import diarioRepository from "@/repositories/diario-repositories";
import { notoundError } from "./errors";
import { BodyDiary } from "@/protocols";

export async function getDiary(date :string) {
      console.log(date)
     const data = await diarioRepository.findByDate(date);
     if(data === null) throw notoundError();
     console.log(data);
     return data;
  }

  export async function postDiary(date:string, body: BodyDiary) {
    console.log(date)
   const data = await diarioRepository.insertByDate(date, body);
   if(data === null) throw notoundError();
   console.log(data);
   return data;
}

const diarioService = {
    getDiary,
    postDiary
  };

  export default diarioService;

