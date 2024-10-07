import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { Produto } from '../../../modelo/Produto';
import { ProdutoCard } from '../../../modelo/ProdutoCard';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { AvaliacaoService } from './../../../services/avaliacao/avaliacao.service';
import { CrudService } from './../../../services/crud-service/crud-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutPrincipalComponent, CommonModule, BotaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  buscarProduto: boolean = false;
  busca: string | null = null;
  produtosBusca: ProdutoCard[] = [];
  produtos: ProdutoCard[] = [];
  private crudService: CrudService<Produto>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private avaliacaoService: AvaliacaoService,
    private carrinhoService: CarrinhoService
  ) {
    this.busca = this.route.snapshot.paramMap.get('busca');
    this.crudService = new CrudService(http, '/home-controle', toastr);
    this.loadProdutos();
  }

  ngOnInit(): void {
    // Verifica a URL e obtém os parâmetros de consulta
    this.busca = this.route.snapshot.paramMap.get('busca');

    if (this.busca) {
      this.buscarRemedio(this.busca);
    }
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

  private buscarRemedio(busca: string) {
    this.crudService
      .listarGet(`/listar-produtos-card?busca=${busca}`)
      .subscribe({
        next: (response) => {
          this.produtosBusca = response;
        }
      });
    this.buscarProduto = true;
  }
}
