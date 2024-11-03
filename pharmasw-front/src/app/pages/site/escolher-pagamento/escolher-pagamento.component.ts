import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { InputPrimarioComponent } from "../../../components/input-primario/input-primario.component";
import { InputSecundarioComponent } from "../../../components/input-secundario/input-secundario.component";
import { SelectComponent } from "../../../components/select/select.component";
import { MetodosPagamento } from '../../../modelo/MetodosPagamento';
import { SelectOptions } from '../../../modelo/SelectOpcoes';
import { FormCheckerService } from '../../../services/form-checker/form-checker.service';
import { MetodosPagamentoService } from '../../../services/metodos-pagamento/metodos-pagamento.service';
import { ParcelasService } from '../../../services/parcelas/parcelas.service';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { CarrinhoService } from './../../../services/carrinho/carrinho.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';

@Component({
  selector: 'app-escolher-pagamento',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    BotaoComponent, CommonModule,
    InputPrimarioComponent,
    InputSecundarioComponent,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './escolher-pagamento.component.html',
  styleUrl: './escolher-pagamento.component.css'
})
export class EscolherPagamentoComponent implements OnInit {

  metodosPagamento: MetodosPagamento[] = [];
  optionsParcelas: SelectOptions[] = this.getParcelamentos();
  metodoSelecionado: MetodosPagamento;
  pagamentoForm: FormGroup;

  styleInput = "font-size:20px";
  styleLabel = "font-size:22px";


  constructor(
    private metodosPagamentoService: MetodosPagamentoService,
    private toastr: ToastrService,
    private checker: FormCheckerService,
    private checkoutService: CheckoutService,
  ) {
    this.getMetodosPagamento();
    this.iniciaForm();
  }

  ngOnInit(): void {
  }

  selecionarPagamento(metodo: MetodosPagamento): void {
    this.metodoSelecionado = metodo;
    sessionStorage.setItem('metodosPagamentoSelecionado', JSON.stringify(metodo));
  }


  redirecionarResumo() {
    if (this.metodoSelecionado.metodoPagamento == 'CARTAO') {
      if (!this.checker.checkFormErrorsPagamento(this.pagamentoForm)){
        return;
      };
    }

    this.checkoutService.realizaCheckout();
  }



  private getMetodosPagamento() {
    this.metodosPagamentoService.listarGet("/get-metodos").subscribe((response) => {
      this.metodosPagamento = response;
      this.metodoSelecionado = response[0];
    })
  }

  private iniciaForm() {
    this.pagamentoForm = new FormGroup({
      numeroCartao: new FormControl('', Validators.required),
      codigoCartao: new FormControl('', Validators.required),
      nomeTitular: new FormControl('', Validators.required),
      dataVencimento: new FormControl('', Validators.required),
      qtdParcelas: new FormControl('', Validators.required),
    });
  }

  private getParcelamentos(): SelectOptions[] {

    const options: SelectOptions[] = [];
    const precoTotalCompra = new CarrinhoService(this.toastr).getTotalPreco();
    const parcelasDisponiveis = new ParcelasService().verificarParcelasDisponiveis(precoTotalCompra);

    parcelasDisponiveis.forEach(parcela => {
      let opt = new SelectOptions();
      opt.text = parcela.qtdParcela + "x de R$" + parcela.valorParcela;
      opt.value = parcela.qtdParcela + "; " + parcela.valorParcela;
      options.push(opt)
    });

    return options;
  }


}

