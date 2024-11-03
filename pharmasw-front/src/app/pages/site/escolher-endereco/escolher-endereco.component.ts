import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputSecundarioComponent } from '../../../components/input-secundario/input-secundario.component';
import { AuthService } from '../../../infra/auth/auth.service';
import { Cliente } from '../../../modelo/Cliente';
import { Endereco } from '../../../modelo/Endereco';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { EnderecoComponent } from '../endereco/endereco/endereco.component';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { AbrirComponenteService } from './../../../services/abrir-componente/abrir-componente.service';
import { CheckoutService } from './../../../services/checkout/checkout.service';

@Component({
  selector: 'app-escolher-endereco',
  standalone: true,
  imports:
    [
      LayoutPrincipalComponent,
      CommonModule,
      InputSecundarioComponent,
      BotaoComponent
    ],
  templateUrl: './escolher-endereco.component.html',
  styleUrl: './escolher-endereco.component.css'
})
export class EscolherEnderecoComponent extends CrudService<Cliente> {
  dados: Cliente;
  enderecos: Endereco[] = [];
  enderecoSelecionado: Endereco | null = null;

  ngOnInit(): void {
    this.getEnderecos();
  }

  constructor(
    private dialog: MatDialog,
    private enderecoService: EnderecoService,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private chckoutService: CheckoutService,
    private router: Router,
    private abrirComponent: AbrirComponenteService
  ) {
    super(http, "/cliente-controle", toastr);
  }

  addEndereco() {
    const dados = {};
    this.abrirComponent.abrirComponent(dados, EnderecoComponent).subscribe(() => {
      this.getEnderecos();
    });
  }

  selecionarEndereco(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
    this.setaEndereco();
    this.toastr.success('Endereço de entrega selecionado com sucesso.');
  }

  escolherPagamento() {
    if (this.enderecoSelecionado) {
      this.chckoutService.realizaCheckout();
    } else {
      this.toastr.warning('Selecione um endereço.');
    }
  }

  private setaEndereco() {
    this.enderecoService.setEnderecoSelecionado(this.enderecoSelecionado);
  }

  private getEnderecos(): void {
    const userId = this.authService.getIdUser();
    this.enderecoService.listarEntrega(`/cliente-listar-endereco-entrega?idCliente=${userId}`).subscribe({
      next: (enderecos: Endereco[]) => {
        this.enderecos = enderecos;
        if (this.enderecos) {
          this.enderecoSelecionado = this.enderecos[0];
          this.setaEndereco();
        }
      },
      error: (resp) => {
        if (resp.status !== 404) {
          this.toastr.error('Erro inesperado. Por favor, tente novamente mais tarde.');
        }
      }
    });
  }

}
