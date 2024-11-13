import { Cliente } from './Cliente';
import { Endereco } from "./Endereco";
import { StatusPedido } from "./enums/StatusPedido";
import { ItemPedido } from "./ItemPedido";
import { MetodosPagamento } from "./MetodosPagamento";

export class Pedido {
  id: number;
  idCliente?: number;
  idEndereco?: number;
  idMetodoPagamento?: number;
  cliente: Cliente;
  endereco: Endereco;
  metodosPagamento : MetodosPagamento;
  statusPedido: StatusPedido;
  dataCompra: Date;
  subTotal: number;
  total: number;
  frete: number;
  itemsPedido: ItemPedido[];

  constructor(
    idCliente: number = 0,
    idEndereco: number = 0,
    idMetodoPagamento: number = 0,
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
