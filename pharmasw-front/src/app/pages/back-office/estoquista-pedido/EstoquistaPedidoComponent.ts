import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../infra/auth/auth.service';
import { Pedido } from '../../../modelo/Pedido';
import { EstoquistaService } from '../../../services/estoquista/estoquista.service';
import { StatusPedido, StatusPedidoDescricao } from '../../../modelo/enums/StatusPedido';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { PaginaLayoutComponent } from "../../../components/back-office/pagina-layout/pagina-layout.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estoquista-pedido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginaLayoutComponent,
    BotaoComponent,
    ModalComponent,
  ],
  templateUrl: './estoquista-pedido.component.html',
  styleUrls: ['./estoquista-pedido.component.css'],
})
export class EstoquistaPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  idCliente: number;
  novoStatus: { [key: number]: StatusPedido } = {};
  statusDisponiveis = Object.values(StatusPedido);
  statusDescricao = StatusPedidoDescricao;

  formEdicaoPedido: FormGroup;
  modalAberto = false;

  constructor(
    private estoquista: EstoquistaService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.idCliente = this.auth.getIdUser();

    this.formEdicaoPedido = new FormGroup({
      id: new FormControl(null, Validators.required),
      statusPedido: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  atualizarStatusEFecharModal(): void {
    this.atualizarStatusPedido(); 
    this.fecharModal();
    location.reload();

  }

  carregarPedidos(): void {
    this.estoquista.listarTodos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.pedidos.forEach(pedido => {
          this.novoStatus[pedido.id] = pedido.statusPedido;
        });
      },
      error: (err) => console.error("Erro ao carregar pedidos", err),
    });
  }

  abrirModal(pedido: Pedido): void {
    this.modalAberto = true;
    this.formEdicaoPedido.patchValue({
      id: pedido.id,
      statusPedido: pedido.statusPedido,
    });
  }

  onAction() {
    this.router.navigate(['/estoquista-pedido']);
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  atualizarStatusPedido(): void {
    if (this.formEdicaoPedido.valid) {
      const pedidoAtualizado = this.formEdicaoPedido.value;

      this.estoquista.atualizarStatusPedido(pedidoAtualizado.id, pedidoAtualizado.statusPedido).subscribe({
        next: () => {
          // Mostrar mensagem de sucesso
          this.toastr.success('Status do pedido atualizado com sucesso!', 'Sucesso');

          // Fechar o modal
          this.fecharModal();

          // Recarregar a página após a atualização
          location.reload();
        },
        error: (err) => {
          console.error("Erro ao atualizar pedido", err);
          this.toastr.error("Erro ao atualizar pedido.", "Erro");
        }
      });
    }
  }
}