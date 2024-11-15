import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../modelo/Pedido';
import { AuthService } from '../../../infra/auth/auth.service';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutPrincipalComponent } from '../../site/layout-principal/layout-principal.component';

@Component({
  selector: 'app-estoquista-pedido',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    BotaoComponent,
    CommonModule,
  ],
  templateUrl: './estoquista-pedido.component.html',
  styleUrl: './estoquista-pedido.component.css'
})
export class EstoquistaPedidoComponent implements OnInit {
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
}

