import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/carrinho/cart.service';
import { Produto } from '../../../modelo/Produto';

@Component({
  selector: 'app-carrinho-component',
  templateUrl: './carrinho-component.component.html',
  styleUrls: ['./carrinho-component.component.css'],
})
export class CarrinhoComponentComponent implements OnInit {
  cartItems: Produto[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      this.cartItems = [
    { id: 1, nome: 'Produto Teste', valor: 10 },
    { id: 2, nome: 'Outro Produto', valor: 20,}
  ];
  this.calculateTotal();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    console.log('Itens do carrinho:', this.cartItems);  // Verificar se os itens estão carregados
    this.calculateTotal();
  }

  removeFromCart(produto: Produto) {
    this.cartService.removeItem(produto);
    this.loadCart();
  }

  calculateTotal() {
    this.total = this.cartService.getTotalPreco();
  }
}
