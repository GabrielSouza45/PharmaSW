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
  selector: 'app-resumo-pedido',
  standalone: true,
  imports: [
    CurrencyPipe,
    BotaoComponent,
    InputPrimarioComponent,
    CommonModule,
    LayoutPrincipalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css'],
})
export class ResumoPedidoComponent implements OnInit {
  produtos: Produto[] = [];
  endereco: any;
  formaPagamento: any;
  precoSubtotal: number = 0;
  precoTotal: number = 0;
  freteSelecionado: OpcoesCep;

  constructor(private carrinhoService: CarrinhoService) {
    this.produtos = this.carrinhoService.getItems();
    this.freteSelecionado = JSON.parse(localStorage.getItem('freteSelecionado') || '{}');
    this.endereco = JSON.parse(sessionStorage.getItem('endereco') || '{}');
    this.formaPagamento = JSON.parse(sessionStorage.getItem('formaPagamento') || '{}');
  }

  ngOnInit() {
    this.precoSubtotal = this.getSubTotal();
    this.precoTotal = this.getTotalPreco();
  }

  getTotalPreco(): number {
    return this.carrinhoService.getTotalPreco(this.freteSelecionado);
  }

  getSubTotal(): number {
    return this.carrinhoService.getSubtotalPreco();
  }
}
