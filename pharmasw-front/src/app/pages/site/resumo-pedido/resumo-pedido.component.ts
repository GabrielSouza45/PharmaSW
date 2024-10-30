import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { OpcoesCep } from '../../../modelo/OpcoesCep';


@Component({
  selector: 'app-resumo-pedido',
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

  constructor(private carrinhoService: CarrinhoService) {
    this.produtos = this.carrinhoService.getItems();
    this.freteSelecionado = JSON.parse(localStorage.getItem('freteSelecionado') || '{}');
    this.endereco = JSON.parse(sessionStorage.getItem('endereco') || '{}');
    this.formaPagamento = JSON.parse(sessionStorage.getItem('formaPagamento') || '{}');
  }

  ngOnInit() {
    this.precoSubtotal = this.getSubTotal();
    this.precoTotal = this.getTotalPreco();
  }

  getTotalPreco(): number {
    return this.carrinhoService.getTotalPreco(this.freteSelecionado);
  }

  getSubTotal(): number {
    return this.carrinhoService.getSubtotalPreco();
  }
}
