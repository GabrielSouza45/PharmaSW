import { CheckoutService } from './../../../services/checkout/checkout.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentType, ToastrService } from 'ngx-toastr';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { Cep } from '../../../modelo/Cep';
import { OpcoesCep } from '../../../modelo/OpcoesCep';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { CorreiosApiService } from './../../../services/correios/correios-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EscolherEnderecoComponent } from '../escolher-endereco/escolher-endereco.component';
import { EscolherPagamentoComponent } from '../escolher-pagamento/escolher-pagamento.component';
import { CheckoutService } from '../../../services/checkout/checkout.service';

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
export class CarrinhoComponentComponent implements OnInit{
  cepForm: FormGroup;
  opcaoForm: FormGroup;
  cep: Cep;
  produtos: Produto[] = [];
  precoSubtotal: number = this.getSubTotal();
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
    this.opcaoForm
      .get('opcaoCep')
      ?.valueChanges.subscribe((value: OpcoesCep) => {
        this.freteSelecionado = value;
        this.precoTotal = this.getTotalPreco(value);
      });
  }

  // Injetar o serviço de carrinho
  constructor(
    private dialog: MatDialog,
    private carrinhoService: CarrinhoService,
    private correiosService: CorreiosApiService,
    private toastrService: ToastrService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.produtos = carrinhoService.getItems();
    this.freteSelecionado = new OpcoesCep(1, '', 0);
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
      this.precoSubtotal = this.getSubTotal();
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

  getSubTotal(): number {
    return this.carrinhoService.getSubtotalPreco();
  }

  pesquisarCep() {
    if (this.cepForm.controls['cep']?.errors?.['required']) {
      this.toastrService.warning('O campo CEP é obrigatório.');
      return;
    }
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

  redirecionarCheckout(){
    this.checkoutService.
  }

  private abrirComponent(
    dados: any,
    component: ComponentType<any>
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data: dados,
    });
    // Escutando o resultado após fechar o modal
    return dialogRef.afterClosed();
  }
}
