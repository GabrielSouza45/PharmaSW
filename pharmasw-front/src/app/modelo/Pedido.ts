import { StatusPedido } from "./enums/StatusPedido";
import { ItemPedido } from "./ItemPedido";

export class Pedido {
  id: number;
  idCliente: number;
  idEndereco: number;
  idMetodoPagamento: number;
  statusPedido: StatusPedido;
  dataCompra: Date;
  subTotal: number;
  total: number;
  frete: number;
  itemsPedido: ItemPedido[];

  constructor(
    idCliente: number,
    idEndereco: number,
    idMetodoPagamento: number,
    subTotal: number,
    total: number,
    frete: number,
    itemsPedido: ItemPedido[]

  ) {
    this.idCliente = idCliente;
    this.idEndereco = idEndereco;
    this.idMetodoPagamento = idMetodoPagamento;
    this.subTotal = subTotal;
    this.total = total;
    this.frete = frete;
    this.itemsPedido = itemsPedido;
  }
}
