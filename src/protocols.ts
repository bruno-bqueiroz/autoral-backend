export type ApplicationError = {
    name: string;
    message: string;
  };
  
  export type ViaCEPAddress = {
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
  
  };
  
  //Regra de Negócio
  export type AddressEnrollment = {
    logradouro: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    error?: string
  
  }
  
  export type RequestError = {
    status: number,
    data: object | null,
    statusText: string,
    name: string,
    message: string,
  };

  export type BodyDiary = {
    id?: number ,
    entrada: number,
    saida: number,
    horasTrabalhadas: number,
    KmPercorridos: number,
    NumeroViagens: number,
    date?: string,
    userId?: number
  }