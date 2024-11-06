import { StateService } from './../state-share/state.service';
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
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


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
    private router: Router,
    private stateService: StateService
  ) {
    super(http, "/pedido-controle", toastr);
  }


  cadastrar() {

    const pedido: Pedido = this.getPedido();
    this.adicionar(pedido, "/cadastrar").subscribe({
      next: (response) => {
        this.toastr.success("Pedido realizado com sucesso!");
        this.carrinhoService.limpar();
        this.carrinhoService.setFrete(null);
        this.redireciona(response.body);
      },
      error: (erro) => {
        this.toastr.error(erro.error ? erro.error.menssagem : "Erro ao realizar pedido.");
        console.log(erro);

      }
    })

  }

  private redireciona(retorno: PedidoDTO) {
    this.stateService.setData(retorno);
    this.router.navigate(['/pedido-criado']);
  }

  private getPedido() {
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

  listarPorCliente(idCliente: number): Observable<Pedido[]> {
    return this.listarPorParametro('/listar-por-cliente', { idCliente });
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

class PedidoDTO {
  codigo: number;
  status: string;
  valor: number;

  constructor(
    codigo: number,
    status: string,
    valor: number
  ) {
    this.codigo = codigo;
    this.status = status
    this.valor = valor;
  }
}

