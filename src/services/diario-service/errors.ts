import { ApplicationError } from "@/protocols";

export function notoundError(): ApplicationError {
    return {
      name: "NotoundError",
      message: "NotHaveDataForThisDay",
    };
  }