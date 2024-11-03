import { EnderecoService } from './../endereco/endereco.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../infra/auth/auth.service';
import { ItemPedido } from '../../modelo/ItemPedido';
import { OpcoesCep } from '../../modelo/OpcoesCep';
import { Pedido } from '../../modelo/Pedido';
import { Produto } from '../../modelo/Produto';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { CrudService } from '../crud-service/crud-service.service';
import { MetodosPagamentoService } from '../metodos-pagamento/metodos-pagamento.service';
import { Endereco } from '../../modelo/Endereco';
import { MetodosPagamento } from '../../modelo/MetodosPagamento';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends CrudService<Pedido> {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private enderecoService: EnderecoService,
    private metodosPagamentoService: MetodosPagamentoService,
  ) {
    super(http, "/pedido-controle", toastr);
  }


  cadastrar() {

    const pedido: Pedido = this.getPedido();
    this.adicionar(pedido, "/cadastrar").subscribe({
      next: (response) => {
        this.toastr.success("Pedido realizado com sucesso!");
        this.redireciona();
      },
      error: (erro) => {
        this.toastr.error(erro);
        console.log(erro);

      }
    })

  }

  private redireciona(){

  }

  private getPedido(){
    const produtos: Produto[] = this.carrinhoService.getItems();
    const clienteId: number = this.auth.getIdUser();
    const endereco: Endereco = this.enderecoService.getEnderecoSelecionado();
    const metodoPagamento: MetodosPagamento = this.metodosPagamentoService.getMetodoSelecionado();
    const subTotal: number = this.carrinhoService.getSubtotalPreco();
    const total: number = this.carrinhoService.getTotalPreco();
    const frete: OpcoesCep = this.carrinhoService.getFrete();
    const itemsPedido: ItemPedido[] = this.getItemsPedido(produtos);

    return new Pedido(
      clienteId,
      endereco.id,
      metodoPagamento.id,
      subTotal,
      total,
      frete.preco,
      itemsPedido
    );
  }

  private getItemsPedido(produtos: Produto[]): ItemPedido[] {

    let itemsPedido: ItemPedido[] = [];

    produtos.forEach(prod => {

      itemsPedido.push(new ItemPedido(
        prod.id,
        prod.valor,
        prod.quantidadePedido
      ));

    });

    return itemsPedido;
  }
}

