import { Status } from "./enums/Status";

export class Produto {

  id: number;
  nome: string;
  avaliacao: number; // Avaliação de 0 a 5 com incrementos de 0,5
  descricao: string;
  valor: number; // Valor monetário com 2 casas decimais
  qtd: number; // Quantidade em estoque
  caminhoImagem: string; // Caminho da imagem armazenado

  status: Status; // Status do produto (ativo ou inativo)

  constructor(
    nome: string,
    avaliacao: number,
    descricao: string,
    valor: number,
    qtd: number,
  ) {
    this.nome = nome;
    this.avaliacao = avaliacao;
    this.descricao = descricao;
    this.valor = valor;
    this.qtd = qtd;
  }
}
