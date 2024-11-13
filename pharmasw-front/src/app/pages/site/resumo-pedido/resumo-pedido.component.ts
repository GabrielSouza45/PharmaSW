
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { OpcoesCep } from '../../../modelo/OpcoesCep';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';




@Component({
  selector: 'app-resumo-pedido',
  standalone: true,
  imports: [
    CurrencyPipe,
    BotaoComponent,
    CommonModule,
    LayoutPrincipalComponent,
  ],
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css'],
})
export class ResumoPedidoComponent implements OnInit {
  produtos: Produto[] = [];
  endereco: any;
  formaPagamento: any;
  precoSubtotal: number = 0;
  precoTotal: number = 0;
  freteSelecionado: OpcoesCep;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private pedidoService: PedidoService
  ) {
    this.produtos = this.carrinhoService.getItems();
    this.freteSelecionado = JSON.parse(localStorage.getItem('freteSelecionado') || '{}');
    this.endereco = JSON.parse(sessionStorage.getItem('enderecoSelecionado') || '{}');
    this.formaPagamento = JSON.parse(sessionStorage.getItem('metodosPagamentoSelecionado'));
  }

  ngOnInit() {
    this.precoSubtotal = this.getSubTotal();
    this.precoTotal = this.getTotalPreco();
  }

  getTotalPreco(): number {
    return this.carrinhoService.getTotalPreco();
  }

  getSubTotal(): number {
    return this.carrinhoService.getSubtotalPreco();
  }

  voltarPagamento() {
      this.router.navigate(['/checkout/pagamento']);
  }

  finalizarPedido(){
    this.pedidoService.cadastrar();
  }

}
