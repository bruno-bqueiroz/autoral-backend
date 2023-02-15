import diarioRepository from "@/repositories/diario-repositories";
import goalRepository from "@/repositories/goal-repository";
import { notFoundError } from "./errors";
import { BodyDiary } from "@/protocols";

export async function getDiary(date :string, userId:number) {

     const data = await diarioRepository.findByDate(date, userId);
     if(data === null) throw notFoundError();
     
     return data;
  }

  export async function postDiary(date:string, body: BodyDiary, userId:number) {
   
   const month = date.split("-")
   console.log(month[1])
   const dataGoal = await goalRepository.findByuserId(userId, Number(month[1]));
   const oldInput = dataGoal.entrada + body.entrada
   const idGoal = dataGoal.id
   const newDataGoal = await goalRepository.updateInput(oldInput, idGoal);
   console.log(newDataGoal)
   const data = await diarioRepository.insertByDate(date, body, userId);
   if(data === null) throw notFoundError();
   
   return data;
}

const diarioService = {
    getDiary,
    postDiary
  };

  export default diarioService;

