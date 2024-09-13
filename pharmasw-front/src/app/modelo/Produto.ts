import { Status } from "./enums/Status";

export class Produto {
  id: number;
  status: Status;
  nome: string;
  categoria: string;
  fabricante: string;
  quantidadeEstoque: number;
  valor: number;
  peso: number;

  constructor(
    nome: string,
    categoria: string,
    valor: number,
    peso: number,
    fabricante: string,
    quantidadeEstoque: number
  ) {
    this.nome = nome;
    this.categoria = categoria;
    this.valor = valor;
    this.peso = peso;
    this.fabricante = fabricante;
    this.quantidadeEstoque = quantidadeEstoque;
  }
}
