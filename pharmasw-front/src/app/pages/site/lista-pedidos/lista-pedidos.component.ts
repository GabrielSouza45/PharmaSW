import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../modelo/Pedido';
import { AuthService } from '../../../infra/auth/auth.service';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CommonModule } from '@angular/common';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    BotaoComponent,
    CommonModule,
  ],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  idCliente: number;

  constructor(
    private pedidoService: PedidoService,
    private auth: AuthService,
    private router: Router
  ) {
    this.idCliente = this.auth.getIdUser();
  }

  ngOnInit(): void {
    this.pedidoService.listarPorCliente(this.idCliente).subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error("Erro ao carregar pedidos", err)
    });
  }

  detalharPedido(id: number){
    	this.router.navigate(['/detalhes-pedido/'+id]);
  }

}

