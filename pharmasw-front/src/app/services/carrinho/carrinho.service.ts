import { Injectable } from '@angular/core';
import { Produto } from '../../modelo/Produto';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  items: Produto[] = [];

  constructor() {
    this.carregarCarrinho();
  }

  adicionar(produto: Produto): void {
    const item = this.items.find((p) => p.id === produto.id);
    if (item) {
      item.quantidadePedido += 1;
    } else {
      produto.quantidadePedido = 1;
      this.items.push(produto);
    }
    this.salvarCarrinho();
  }

  diminuirQuantidade(produtoId: number): void {
    const item = this.items.find((p) => p.id === produtoId);
    if (item && item.quantidadePedido > 1) {
      item.quantidadePedido -= 1;
      if (item.quantidadePedido === 0) {
        this.removeItem(item);
      }
      this.salvarCarrinho();
    }
  }

  alterarQuantidade(produtoId: number, quantidade: number): void {
    const item = this.items.find((p) => p.id === produtoId);
    if (item) {
      item.quantidadePedido = quantidade;
      if (quantidade === 0) {
        this.removeItem(item);
      }
      this.salvarCarrinho();
    }
  }

  getItems(): Produto[] {
    return this.items;
  }

  limpar(): Produto[] {
    this.items = [];
    this.salvarCarrinho();
    return this.items;
  }

  removeItem(produto: Produto): void {
    const index = this.items.indexOf(produto);
    if (index > -1) {
      this.items.splice(index, 1);
      this.salvarCarrinho();
    }
  }

  salvarCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.items));
  }

  carregarCarrinho(): void {
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
      this.items = JSON.parse(carrinho);
    }
  }

  getTotalPreco(): number {
    return this.items.reduce((total: number, produto: Produto) => {
      total += produto.valor * produto.quantidadePedido;
      return total;
    }, 0);
  }
}
