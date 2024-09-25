import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgFor
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  carrinho: any[] = []; // Lista de produtos
  subtotal: number = 0;
  freteTotal: number = 0;

  constructor(private toastr: ToastrService) {
    this.carregarCarrinho();
  }

  // Simula o carregamento inicial do carrinho
  carregarCarrinho() {
    this.carrinho = [
      { id: 1, nome: 'Produto A', preco: 100, quantidade: 2, frete: 10 },
      { id: 2, nome: 'Produto B', preco: 50, quantidade: 1, frete: 5 }
    ];
    this.recalcularSubtotal();
  }

  // Função para diminuir a quantidade de um produto
  diminuirQuantidade(produto: any) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    } else {
      this.toastr.warning('A quantidade mínima é 1');
    }
    this.recalcularSubtotal();
  }

  // Função para recalcular o subtotal incluindo o frete
  recalcularSubtotal() {
    let subtotal = this.carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
    let freteTotal = this.carrinho.reduce((totalFrete, produto) => totalFrete + produto.frete, 0);

    this.subtotal = subtotal + freteTotal; // Inclui o frete no subtotal
  }
}
