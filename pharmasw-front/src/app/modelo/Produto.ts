import { Status } from "./enums/Status";

export class Produto {

  id: number;
  nome: string;
  avaliacao: number; // Avaliação de 0 a 5 com incrementos de 0,5
  descricao: string;
  valor: number; // Valor monetário com 2 casas decimais
  qtd: number; // Quantidade em estoque
  caminhoImagem: string; // Caminho da imagem armazenado
  status: Status;
  categoria: string;
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
