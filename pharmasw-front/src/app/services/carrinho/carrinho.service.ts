import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../../modelo/Produto';
import { OpcoesCep } from './../../modelo/OpcoesCep';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  items: Produto[] = [];
  private freteSelecionado: OpcoesCep;

  private itemCountSubject = new BehaviorSubject<number>(this.inicia());
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(private toastrService: ToastrService) {
    this.carregarCarrinho();
  }

  adicionar(produto: Produto, quantidade: number): boolean {
    const item = this.items.find((p) => p.id === produto.id);

    if (!this.validaEstoque(produto, quantidade)) {
      this.toastrService.warning('Quantidade indisponível');
      return false;
    }

    if (item) {
      item.quantidadePedido += quantidade;
    } else {
      produto.quantidadePedido = quantidade;
      this.items.push(produto);
    }
    this.salvarCarrinho();
    this.toastrService.success("Produto adicionado ao carrinho.")
    return true;
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
    this.setFrete(null)
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

  getFrete() {
    return this.freteSelecionado;
  }

  setFrete(cepSelecionado: OpcoesCep) {
    this.freteSelecionado = cepSelecionado;
    localStorage.setItem('freteSelecionado', JSON.stringify(this.freteSelecionado));
  }

  salvarCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.items));
    if(this.items.length == 0) {
      this.setFrete(null);
    }
    this.itemCountSubject.next(this.items.length);
  }

  carregarCarrinho(): void {
    const carrinho = localStorage.getItem('carrinho');
    const frete = localStorage.getItem('freteSelecionado');
    if (carrinho) {
      this.items = JSON.parse(carrinho);
    }
    if (frete) {
      this.freteSelecionado = JSON.parse(frete);
    }
  }

  getSubtotalPreco(): number {
    let total = this.items.reduce((total: number, produto: Produto) => {
      total += produto.valor * produto.quantidadePedido;
      return total;
    }, 0);

    return total;
  }

  getTotalPreco(): number {
    let total = this.items.reduce((total: number, produto: Produto) => {
      total += produto.valor * produto.quantidadePedido;
      return total;
    }, 0);

    if (this.freteSelecionado)
      total += this.freteSelecionado.preco;

    return total;
  }

  private validaEstoque(produto: Produto, quantidade: number): boolean {
    let temEstoque: boolean = false;
    const item = this.items.find((p) => p.id === produto.id);
    const qtdEstoque: number = produto.quantidadeEstoque;

    if (qtdEstoque >= quantidade) temEstoque = true;

    if (item) {
      if (qtdEstoque >= item.quantidadePedido + quantidade) temEstoque = true;
      else temEstoque = false;
    }

    return temEstoque;
  }

  verificaEstoqueProdutos(): boolean{
    let estoqueDisponivel = true;
    this.items.map((prod) => {
      const qtdPedido = prod.quantidadePedido;
      const qtdestoque = prod.quantidadeEstoque;
      if (qtdPedido > qtdestoque) {
        estoqueDisponivel = false;
        this.toastrService.warning(`\nQuantidade Solicitada: ${qtdPedido} \nQuantidade Disponível: ${qtdestoque}`, `Produto: ${prod.nome}, não tem estoque suficiente!`)
      }
    });
    return estoqueDisponivel;
  }

  private inicia(): number{
    this.carregarCarrinho();
    return this.items.length;
  }
}
