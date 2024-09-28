import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../../modelo/Produto';
import { ProdutoCard } from '../../../modelo/ProdutoCard';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { CrudService } from './../../../services/crud-service/crud-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutPrincipalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  produtos: ProdutoCard[] = [];
  private crudService: CrudService<Produto>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
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
    const fullStars = Math.floor(produto.avaliacao); // Número de estrelas cheias
    const hasHalfStar = produto.avaliacao % 1 !== 0; // Verifica se há meia estrela
    const totalStars = 5; // Total de estrelas que você quer mostrar

    // Cria um array com as classes das estrelas
    let stars = Array(totalStars).fill('bi-star-fill'); // Estrelas cheias

    // Ajusta o último item se houver uma meia estrela
    if (hasHalfStar) {
      stars[fullStars] = 'bi-star-half'; // Meia estrela
    }

    // Ajusta as estrelas restantes para estrela vazia
    if (fullStars < totalStars) {
      stars.fill('bi-star', fullStars + (hasHalfStar ? 1 : 0)); // Estrela vazia
    }
    return stars;
  }
}
