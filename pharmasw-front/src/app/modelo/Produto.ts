import { Status } from "./enums/Status";
import { ImagemProduto } from "./ImagemProduto";

export class Produto {

  id: number;
  status?: Status;
  nome?: string;
  // categoria: string;
  fabricante: string;
  quantidadeEstoque?: number;
  valor: number;
  // peso: number;
  avaliacao?: number;
  descricao?: string;
  imagemPrincipal?: string;
  quantidadePedido?: number = 0;



  constructor(
    nome: string,
    // categoria: string,
    valor: number,
    // peso: number,
    fabricante: string,
    descricao: string,
    avaliacao: number,
    quantidadeEstoque: number
  ) {
    this.nome = nome;
    // this.categoria = categoria;
    this.valor = valor;
    // this.peso = peso;
    this.fabricante = fabricante;
    this.descricao = descricao;
    this.avaliacao = avaliacao;
    this.quantidadeEstoque = quantidadeEstoque;
  }
}
