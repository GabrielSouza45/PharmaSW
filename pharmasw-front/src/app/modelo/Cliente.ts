import { Genero } from "./enums/Genero";

export class Cliente{
  id: number;
  email: string;
  cpf: string;
  nome: string;
  dataNascimento: string;
  genero: Genero;
  senha: string;

  constructor(
    email: string,
    cpf: string,
    nome: string,
    dataNascimento: string,
    genero: Genero,
    senha: string,
  ){
    this.email = email;
    this.cpf = cpf;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.genero = genero;
    this.senha = senha;
  }
}
