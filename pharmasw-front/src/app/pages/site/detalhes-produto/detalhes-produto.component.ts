import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css'
})
export class DetalhesProdutoComponent {
  produtoId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtemos o ID do produto a partir da rota
    this.produtoId = this.route.snapshot.paramMap.get('id');
    // Aqui você pode fazer uma requisição para buscar os detalhes do produto usando o ID
  }
}
