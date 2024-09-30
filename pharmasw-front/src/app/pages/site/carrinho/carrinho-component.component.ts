import { Component, NgModule} from '@angular/core';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";

@Component({
  selector: 'app-carrinho-component',
  standalone:true,
  imports: [
    CurrencyPipe,
    BotaoComponent,
    InputPrimarioComponent,
    NgIf,
    NgFor,
    LayoutPrincipalComponent
],
  templateUrl: './carrinho-component.component.html',
  styleUrls: ['./carrinho-component.component.css'],
})
export class CarrinhoComponentComponent{
  produto1: Produto = { id: 1, nome: 'Produto 1', fabricante: "issae", valor: 100, quantidadePedido: 0 };
  produto2: Produto = { id: 2, nome: 'Produto 2', fabricante: "issae", valor: 50, quantidadePedido: 0 };

  // Injetar o serviço de carrinho
  constructor(private carrinhoService: CarrinhoService) { }

  // Adicionar produtos
  adicionarProduto(produto: Produto) {
    this.carrinhoService.adicionar(produto, 1);
  }

  // Remover produtos
  removerProduto(produto: Produto) {
    this.carrinhoService.removeItem(produto);
  }

  alterarQuantidade(produto: Produto, event: Event) {
    const quantidade = (event.target as HTMLInputElement).valueAsNumber; // Captura o valor como número
    if (quantidade >= 0) { // Permite apenas números não negativos
      this.carrinhoService.alterarQuantidade(produto.id, quantidade);
    } else {
      this.removerProduto(produto); // Remove o produto quando a quantidade for 0
    }
  }


  // Obter itens do carrinho
  getItems() {
    return this.carrinhoService.getItems();
  }

  // Exibir o preço total
  getTotalPreco(): number {
    return this.carrinhoService.getTotalPreco();
  }
}
