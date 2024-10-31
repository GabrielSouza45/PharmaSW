import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<EnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
  }

  addEndereco(){
    const dados = {};
    this.abrirComponent(dados, EnderecoComponent).subscribe(() => {
      this.getEnderecos();
    });
  }

  private getEnderecos(): void {
    const userId = this.authService.getIdUser();
    this.enderecoService.listarEntrega(`/cliente-listar-endereco-entrega?idCliente=${userId}`).subscribe({
      next: (enderecos: Endereco[]) => {
        this.enderecos = enderecos;
        if (this.enderecos) {
          sessionStorage.setItem('enderecoSelecionado', JSON.stringify(this.enderecos[0]));
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
    sessionStorage.setItem('enderecoSelecionado', JSON.stringify(endereco));
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
