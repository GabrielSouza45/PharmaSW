import { Grupo } from "./enums/Grupo";
import { Status } from "./enums/Status";

export class Usuario {

  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: number;

  grupo: Grupo;
  status: Status;

  dataIni: Date;
  dataAlt: Date;
  dataFim: Date;

  constructor(
    nome: string,
    email: string,
    senha: string,
    cpf: number,
    grupo: Grupo
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.grupo = grupo
  }
}

