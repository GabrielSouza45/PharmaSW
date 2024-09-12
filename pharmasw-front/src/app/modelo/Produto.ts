import { Categoria } from "./enums/Categoria";
import { Status } from "./enums/Status";

export class Produto {

  id: number;
  nome: string;
  descricao: string;
  preco: number;

  categoria: Categoria;
  status: Status;

  dataCriacao: Date;
  dataAlteracao: Date;
  dataRemocao: Date;

  constructor(
    nome: string,
    descricao: string,
    preco: number,
    categoria: Categoria
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
  }
}