import { Produto } from './Produto';
export class ItemPedido {

  produto: Produto;
  codigoProduto: string;
  valorUnitario: number;
  qtdProdutos: number;
  idProduto?: number;

  constructor(
    idProduto: number,
    valorUnitario: number,
    qtdProdutos: number,
  ) {

    this.idProduto = idProduto;
    this.valorUnitario = valorUnitario;
    this.qtdProdutos = qtdProdutos;

  }
}
