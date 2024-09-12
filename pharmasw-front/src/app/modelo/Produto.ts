import { Status } from "./enums/Status";

export class Produto {
  id: number;
  status: Status;
  nome: string;
  categoria: string;
  valor: number;
  peso: number;

  constructor(
    nome: string,
    categoria: string,
    valor: number,
    peso: number
  ) {
    this.nome = nome;
    this.categoria = categoria;
    this.valor = valor;
    this.peso = peso;
  }
}
