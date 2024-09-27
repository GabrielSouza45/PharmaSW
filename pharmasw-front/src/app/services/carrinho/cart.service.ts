import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(produto: any) {
    const item = this.items.find(p => p.id === produto.id);
    if (item) {
      item.quantidade++;
    } else {
      produto.quantidade = 1;
      this.items.push(produto);
    }
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
  }

  removeItem(produto: any) {
    const index = this.items.indexOf(produto);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  saveCart() {
    localStorage.setItem('carrinho', JSON.stringify(this.items));
  }

  loadCart() {
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
      this.items = JSON.parse(carrinho);
    }
  }

  getTotalPreco() {
    return this.items.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  }
}
