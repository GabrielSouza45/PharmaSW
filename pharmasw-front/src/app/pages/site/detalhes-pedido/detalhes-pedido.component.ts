import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MetodosPagamento } from '../../../modelo/MetodosPagamento';
import { Pedido } from '../../../modelo/Pedido';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { AuthService } from './../../../infra/auth/auth.service';
import { Endereco } from './../../../modelo/Endereco';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    CommonModule,
  ],
  templateUrl: './detalhes-pedido.component.html',
  styleUrl: './detalhes-pedido.component.css'
})
export class DetalhesPedidoComponent implements OnInit{
  pedido: Pedido;
  endereco: Endereco;
  formaPagamento: MetodosPagamento;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    const idPedido = Number(this.route.snapshot.paramMap.get('id'));
    this.pedidoService.detalharPedido(idPedido).subscribe({
      next: (pedidos: Pedido) => {
        this.pedido = pedidos;
        this.endereco = this.pedido.endereco;
        this.formaPagamento = this.pedido.metodosPagamento;
      },
      error: () =>{
        this.toastr.error("Erro ao carregar Pedido.");
      }
    });
  }

}
