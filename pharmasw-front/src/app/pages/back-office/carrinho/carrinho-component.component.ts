import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { Produto } from '../../../modelo/Produto';

@Component({
  selector: 'app-carrinho-component',
  templateUrl: './carrinho-component.component.html',
  styleUrls: ['./carrinho-component.component.css'],
})
export class CarrinhoComponentComponent implements OnInit {
  cartItems: Produto[] = [];
  total: number = 0;
  listaDeProdutos: Produto[] = [];

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    // Inicializando com produtos predefinidos
    this.listaDeProdutos = [
      { id: 1, nome: 'Produto Teste', valor: 10, quantidadeEstoque: 5 },
      { id: 2, nome: 'Outro Produto', valor: 20, quantidadeEstoque: 3 },
    ];
    this.CarregarCarrinho();
  }

  CarregarCarrinho() {
    this.cartItems = this.carrinhoService.getItems();
    this.calculaTotal();
  }

  adicionarAoCarrinho(produtoId: number) {
    const produto = this.listaDeProdutos.find(p => p.id === produtoId);
    if (produto) {
      this.carrinhoService.adicionar(produto);
      this.CarregarCarrinho(); // Atualiza o carrinho após adicionar o produto
    }
  }

  removeItemCarrinho(produto: Produto) {
    this.carrinhoService.removeItem(produto);
    this.CarregarCarrinho();
  }

  calculaTotal() {
    this.total = this.carrinhoService.getTotalPreco();
  }
}
