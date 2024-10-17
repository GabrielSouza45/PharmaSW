import { Status } from './../../../modelo/enums/Status';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { InputSecundarioComponent } from "../../../components/input-secundario/input-secundario.component";
import { Cliente } from '../../../modelo/Cliente';
import { Filtros } from '../../../modelo/Filtros';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { AuthService } from './../../../infra/auth/auth.service';
import { Endereco } from './../../../modelo/Endereco';
import { CrudService } from './../../../services/crud-service/crud-service.service';
import { EnderecoService } from './../../../services/endereco/endereco.service';
import { ClienteAlterarComponent } from '../cliente-alterar/cliente-alterar.component';
import { EnderecoComponent } from '../endereco/endereco/endereco.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [LayoutPrincipalComponent, CommonModule, InputSecundarioComponent, BotaoComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent extends CrudService<Cliente>{
  dados: Cliente;
  enderecos: Endereco[] =[];

  constructor(
    private dialog: MatDialog,
    private enderecoService: EnderecoService,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
  ){
    super(http, "/cliente-controle", toastr);
    this.getCliente();
    this.getEnderecos();
  }

  editarDados(){
    const dados = {
      cliente: this.dados
    };
    this.abrirComponent(dados, ClienteAlterarComponent).subscribe(() => {
      this.getCliente();
    });
  }

  addEndereco(){
    const dados = {
      cliente: this.dados
    };
    this.abrirComponent(dados, EnderecoComponent).subscribe(() => {
      this.getEnderecos();
    });
  }


  private getEnderecos(): void{
    let filtro = new Filtros();
    filtro.id = this.authService.getIdUser();
    this.enderecoService.listar("/listar-por-cliente", filtro).subscribe({
      next: (enderecos: Endereco[]) =>{
        this.enderecos = enderecos;
      },
      error: (resp) => {
        if(resp.status != 404)
          this.toastr.error("Erro inesperado. por favor, tente novamente mais tarde.");
      }
    });
  }

  private getCliente(): void{
    let filtro = new Filtros();
    filtro.id = this.authService.getIdUser();
    this.listarUnico(filtro, "/listar-cliente-id").subscribe({
      next: (cliente: Cliente) => {
        this.dados = cliente;
      },
      error: () => {
        this.toastr.error("Erro inesperado. por favor, tente novamente mais tarde.");
      }
    });
  }

  definirPadrao(endereco: Endereco){
    this.enderecoService.alterarPadrao(endereco.id).subscribe({
      next: () => {
        this.toastr.success("Endereço padrão atualizado com sucesso.");
        this.getEnderecos();
      }
    });
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
