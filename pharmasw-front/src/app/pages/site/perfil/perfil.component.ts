import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../modelo/Cliente';
import { Genero } from '../../../modelo/enums/Genero';
import { InputSecundarioComponent } from "../../../components/input-secundario/input-secundario.component";
import { BotaoComponent } from "../../../components/botao/botao.component";
import { Endereco } from '../../../modelo/Endereco';
import { ComponentType } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TipoEndereco } from '../../../modelo/enums/TipoEndereco';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [LayoutPrincipalComponent, CommonModule, InputSecundarioComponent, BotaoComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  dados: Cliente;
  enderecos: Endereco[] =[];

  constructor(
    private dialog: MatDialog

  ){

    this.dados = new Cliente(
      "gabrielsouza45@live.com",
      "42277864870",
      "Gabriel Souza",
      '2001-10-17',
      Genero.MASCULINO,
      ""
    );

    this.enderecos.push(
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        true,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
      new Endereco(
        "04852214",
        "AAA",
        "165",
        "AAA",
        "Jd aaaa",
        "São Paulo",
        "SP",
        false,
        TipoEndereco.ENTREGA
      ),
    )
  }


  definirPadrao(endereco: Endereco){

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
