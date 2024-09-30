import { ToastrService } from 'ngx-toastr';
import { Injectable, OnInit } from '@angular/core';
import { Produto } from '../../modelo/Produto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService{
  items: Produto[] = [];

  private itemCountSubject = new BehaviorSubject<number>(this.inicia());
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(private toastrService: ToastrService) {
    this.carregarCarrinho();
  }

  adicionar(produto: Produto, quantidade: number): void {
    const item = this.items.find((p) => p.id === produto.id);

    if (!this.validaEstoque(produto, quantidade)) {
      this.toastrService.warning('Quantidade indisponível');
      return;
    }

    if (item) {
      item.quantidadePedido += quantidade;
    } else {
      produto.quantidadePedido = quantidade;
      this.items.push(produto);
    }
    this.salvarCarrinho();
    this.toastrService.success("Produto adicionado ao carrinho.")
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
    this.itemCountSubject.next(this.items.length);
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

  private validaEstoque(produto: Produto, quantidade: number): boolean {
    let temEstoque: boolean = false;
    const item = this.items.find((p) => p.id === produto.id);
    const qtdEstoque: number = produto.quantidadeEstoque;

    if (qtdEstoque > quantidade) temEstoque = true;

    if (item) {
      if (qtdEstoque >= item.quantidadePedido + quantidade) temEstoque = true;
      else temEstoque = false;
    }

    return temEstoque;
  }

  private inicia(): number{
    this.carregarCarrinho();
    return this.items.length;
  }
}
