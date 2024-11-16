import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginaInicialLayoutComponent } from '../../../components/back-office/pagina-inicial-layout/pagina-inicial-layout.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { AuthService } from '../../../infra/auth/auth.service';
import { Pedido } from '../../../modelo/Pedido';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { LayoutPrincipalComponent } from '../../site/layout-principal/layout-principal.component';
import { PaginaInicialComponent } from "../pagina-inicial/pagina-inicial.component";
import { PaginaLayoutComponent } from "../../../components/back-office/pagina-layout/pagina-layout.component";


@Component({
  selector: 'app-estoquista-pedido',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    BotaoComponent,
    CommonModule,
    PaginaInicialLayoutComponent,
    PaginaInicialComponent,
    PaginaLayoutComponent
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

  detalharPedido(id: number) {
    this.router.navigate([]);
  }
}
