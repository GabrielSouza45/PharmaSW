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
import { StatusPedido, StatusPedidoDescricao } from '../../../modelo/enums/StatusPedido';
import { EstoquistaService } from '../../../services/estoquista/estoquista.service';


@Component({
  selector: 'app-estoquista-pedido',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    BotaoComponent,
    CommonModule,
    PaginaLayoutComponent
],
  templateUrl: './estoquista-pedido.component.html',
  styleUrl: './estoquista-pedido.component.css'
})
export class EstoquistaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  idCliente: number;
  novoStatus: { [key: number]: StatusPedido } = {};
  statusDisponiveis = Object.values(StatusPedido);
  statusDescricao = StatusPedidoDescricao; //

  constructor(
    private estoquista: EstoquistaService,
    private auth: AuthService,
    private router: Router
  ) {
    this.idCliente = this.auth.getIdUser();
  }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.estoquista.listarTodos().subscribe({
      next: (data) => {
        this.pedidos = data;
        // Inicialize os status de cada pedido
        this.pedidos.forEach(pedido => {
          this.novoStatus[pedido.id] = pedido.statusPedido; // Preenche o status com o valor inicial
        });
      },
      error: (err) => console.error("Erro ao carregar pedidos", err)
    });
  }


  /*atualizarStatus(idPedido: number): void {
    // Passando o novoStatus para o método de atualização
    const statusSelecionado = this.novoStatus[idPedido];
    if (statusSelecionado !== undefined) {
      this.pedidoService.atualizarStatusPedido(idPedido, statusSelecionado).subscribe(
        response => {
          console.log("Status atualizado com sucesso", response);
          this.carregarPedidos(); // Recarrega a lista de pedidos após a atualização
        },
        error => {
          console.error("Erro ao atualizar o status", error);
        }
      );
    } else {
      console.error("Status não selecionado para o pedido", idPedido);
    }
  }*/
}
