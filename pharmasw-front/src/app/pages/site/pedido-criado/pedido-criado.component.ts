import { StatusPedidoDescricao } from './../../../modelo/enums/StatusPedido';
import { StateService } from './../../../services/state-share/state.service';
import { Component } from '@angular/core';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { StatusPedido } from '../../../modelo/enums/StatusPedido';
import { CommonModule } from '@angular/common';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-criado',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    CommonModule,
    BotaoComponent
],
  templateUrl: './pedido-criado.component.html',
  styleUrl: './pedido-criado.component.css'
})
export class PedidoCriadoComponent {
  pedido = this.stateService.getData();

  constructor(
    private stateService: StateService,
    private router: Router,
  ) {
  }

  voltarHome(){
    this.router.navigate(['/']);
  }
}
