import { Injectable } from '@angular/core';
import { Produto } from '../../modelo/Produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  items: any[] = [];

  constructor() {
    this.carregarCarrinho();
  }

  adicionar(produto: Produto) {
    const item = this.items.find(p => p.id === produto.id);
    if (item) {
        this.aumentarQuantidade(produto.id);
        } else {
          produto.quantidadePedido = 1;
        this.items.push(produto);
    }
    this.salvarCarrinho();
  }

// Aumentar quantidade de um produto no carrinho
  aumentarQuantidade(produtoId: number) {
    const item = this.items.find(p => p.id === produtoId);
    if (item) {
      item.quantidadePedido += 1;
      this.salvarCarrinho();
  }
}

diminuirQuantidade(produtoId: number) {
  const item = this.items.find(p => p.id === produtoId);
  if (item && item.quantidadePedido > 1) {
    item.quantidadePedido -= 1;
    this.salvarCarrinho();
  }
}

  getItems() {
    return this.items;
  }

  limpar() {
    this.items = [];
    this.salvarCarrinho();
    return this.items;
  }

  removeItem(produto: Produto) {
    const index = this.items.indexOf(produto);
    if (index > -1) {
      this.items.splice(index, 1);
      this.salvarCarrinho();
    }
  }

  salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.items));
  }

  carregarCarrinho() {
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
      this.items = JSON.parse(carrinho);
    }
  }

  getTotalPreco() {
    return this.items.reduce((total, produto) => total + produto.preco * produto.quantidadePedido, 0);
  }
}
