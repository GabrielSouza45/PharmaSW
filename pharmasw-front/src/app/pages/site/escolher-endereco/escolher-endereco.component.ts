import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComponentType, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputSecundarioComponent } from '../../../components/input-secundario/input-secundario.component';
import { AuthService } from '../../../infra/auth/auth.service';
import { Cliente } from '../../../modelo/Cliente';
import { Endereco } from '../../../modelo/Endereco';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { EnderecoComponent } from '../endereco/endereco/endereco.component';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';

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
export class EscolherEnderecoComponent extends CrudService<Cliente>{
  dados: Cliente;
  enderecos: Endereco[] =[];
  enderecoSelecionado: Endereco | null = null;

  constructor(
    private dialog: MatDialog,
    private enderecoService: EnderecoService,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ){
    super(http, "/cliente-controle", toastr);
    this.getEnderecos();
  }

  ngOnInit(): void {
    this.getEnderecos();
    // Verificar se há um endereço temporário salvo no localStorage
    const enderecoSalvo = localStorage.getItem('enderecoTemporario');
    if (enderecoSalvo) {
      this.enderecoSelecionado = JSON.parse(enderecoSalvo);
    }
  }

  addEndereco(){
    const dados = {
      cliente: this.dados,
    };
    this.abrirComponent(dados, EnderecoComponent).subscribe(() => {
      this.getEnderecos();
    });
  }

  private getEnderecos(): void {
    const userId = this.authService.getIdUser();
    this.enderecoService.listarEntrega('/listar-por-cliente', { id: userId }).subscribe({
      next: (enderecos: Endereco[]) => {
        this.enderecos = enderecos;
        // Definir o endereço padrão se houver um no localStorage
        if (!this.enderecoSelecionado) {
          this.enderecoSelecionado = this.enderecos.find(endereco => endereco.padrao) || null;
        }
      },
      error: (resp) => {
        if (resp.status !== 404) {
          this.toastr.error('Erro inesperado. Por favor, tente novamente mais tarde.');
        }
      }
    });
  }

  selecionarEndereco(endereco: Endereco): void {
    this.enderecoSelecionado = endereco;
    localStorage.setItem('enderecoSelecionadoId', endereco.id.toString());
    this.toastr.success('Endereço de entrega selecionado com sucesso.');
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

  escolherPagamento() {
    if (this.enderecoSelecionado) {
      this.router.navigate(['/escolher-pagamento']);
    }
  }

}
