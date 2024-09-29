import { AvaliacaoService } from './../../../services/avaliacao/avaliacao.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../../modelo/Produto';
import { ProdutoCard } from '../../../modelo/ProdutoCard';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { CrudService } from './../../../services/crud-service/crud-service.service';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutPrincipalComponent, CommonModule, BotaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  produtos: ProdutoCard[] = [];
  private crudService: CrudService<Produto>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private avaliacaoService: AvaliacaoService,
    private carrinhoService: CarrinhoService

  ) {
    this.crudService = new CrudService(http, '/home-controle', toastr);
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.crudService.listarGet('/listar-produtos-card').subscribe((data) => {
      this.produtos = data;
    });
  }

  detalharProduto(produto: Produto) {
    this.router.navigate(['/produto', produto.id]);
  }

  generateStars(produto: Produto): string[] {
    return this.avaliacaoService.generateStars(produto);
  }

  adicionarCarrinho(produto: Produto) {
    this.carrinhoService.adicionar(produto, 1);
  }
}
