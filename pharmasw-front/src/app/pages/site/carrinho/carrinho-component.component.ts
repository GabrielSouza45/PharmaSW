import { Login } from './../../../modelo/Login';
import { CorreiosApiService } from './../../../services/correios/correios-api.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { OpcoesCep } from '../../../modelo/OpcoesCep';
import { ToastrService } from 'ngx-toastr';
import { Cep } from '../../../modelo/Cep';

@Component({
  selector: 'app-carrinho-component',
  standalone: true,
  imports: [
    CurrencyPipe,
    BotaoComponent,
    InputPrimarioComponent,
    CommonModule,
    LayoutPrincipalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './carrinho-component.component.html',
  styleUrls: ['./carrinho-component.component.css'],
})
export class CarrinhoComponentComponent {
  cepForm: FormGroup;
  opcaoForm: FormGroup;
  cep: Cep;
  produtos: Produto[] = [];
  precoTotal: number = this.getTotalPreco();
  opcoesCep: OpcoesCep[] = [];
  freteSelecionado: OpcoesCep;

  ngOnInit() {
    // Inicializando o formulário com um grupo de radio buttons
    this.opcaoForm = new FormGroup({
      opcaoCep: new FormControl(''),
    });

    this.cepForm = new FormGroup({
      cep: new FormControl('', Validators.required),
    });

    // Escutando as mudanças de valor do radio button
    this.opcaoForm.get('opcaoCep')?.valueChanges.subscribe((value: OpcoesCep) => {
      this.freteSelecionado = value;
      this.precoTotal = this.getTotalPreco(value);
    });
  }

  // Injetar o serviço de carrinho
  constructor(
    private carrinhoService: CarrinhoService,
    private correiosService: CorreiosApiService,
    private toastrService: ToastrService
  ) {
    this.produtos = carrinhoService.getItems();
  }

  // Adicionar produtos
  adicionarProduto(produto: Produto) {
    this.carrinhoService.adicionar(produto, 1);
  }

  // Remover produtos
  removerProduto(produto: Produto) {
    this.carrinhoService.removeItem(produto);
    this.precoTotal = this.getTotalPreco(this.freteSelecionado);
  }

  alterarQuantidade(produto: Produto, event: Event) {
    const quantidade = (event.target as HTMLInputElement).valueAsNumber; // Captura o valor como número
    if (quantidade >= 0) {
      // Permite apenas números não negativos
      this.carrinhoService.alterarQuantidade(produto.id, quantidade);
      this.precoTotal = this.getTotalPreco(this.freteSelecionado);
    } else {
      this.removerProduto(produto); // Remove o produto quando a quantidade for 0
    }
  }

  // Obter itens do carrinho
  getItems() {
    return this.carrinhoService.getItems();
  }

  // Exibir o preço total
  getTotalPreco(cep?: OpcoesCep): number {
    return this.carrinhoService.getTotalPreco(cep);
  }

  pesquisarCep() {
    // if (this.cepForm.controls['cep']?.errors?.['required']) {
    //   this.toastrService.warning('O campo CEP é obrigatório.');
    //   return;
    // }
    this.correiosService.consultar(this.cepForm.value.cep).subscribe({
      next: (cep) => {
        if (!cep) {
          this.toastrService.error('CEP não localizado.');
        } else {
          this.cep = cep;
        }
      },
      error: (erro) => {
        this.toastrService.error('Erro ao localizar CEP.');
      },
    });

    this.opcoesCep = [
      new OpcoesCep(1, '5 dias úteis', 20),
      new OpcoesCep(2, '7 dias úteis', 15.5),
      new OpcoesCep(3, '14 dias úteis', 7),
    ];

    }
}
