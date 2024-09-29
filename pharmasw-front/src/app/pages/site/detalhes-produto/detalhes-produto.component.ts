import { AvaliacaoService } from './../../../services/avaliacao/avaliacao.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { ImagemProduto } from '../../../modelo/ImagemProduto';
import { Filtros } from '../../../modelo/Filtros';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { Produto } from '../../../modelo/Produto';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ImagemService } from '../../../services/imagem/imagem.service';
import { CommonModule } from '@angular/common';
import { InputPrimarioComponent } from "../../../components/input-primario/input-primario.component";
import { BotaoComponent } from "../../../components/botao/botao.component";
import { TextAreaComponent } from "../../../components/text-area/text-area.component";

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [LayoutPrincipalComponent, CarouselComponent, CommonModule, InputPrimarioComponent, BotaoComponent, TextAreaComponent],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent extends CrudService<Produto> {
  produtoId: string | null = null;
  imagens: ImagemProduto[] = [];
  produto: Produto;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private avaliacaoService: AvaliacaoService
  ) {
    super(http, '/home-controle', toastrService);
  }

  ngOnInit(): void {
    // Obtemos o ID do produto a partir da rota
    this.produtoId = this.route.snapshot.paramMap.get('id');
    // Aqui você pode fazer uma requisição para buscar os detalhes do produto usando o ID

    const filtro = new Filtros();
    filtro.id = parseInt(this.produtoId);
    this.listarUnico(filtro, '/listar-produto').subscribe((response: any) => {
      this.carregaImagens(response.imagens);
      response.imagens = null;
      this.produto = response;
  });
  }

  private carregaImagens(imagens: [string[]]): void {
    imagens.forEach((img) => {
      let image = new ImagemProduto();
      image.imagem = img;
      this.imagens.push(image);
    });
  }

  generateStars(produto: Produto): string[]{
    return this.avaliacaoService.generateStars(produto);
  }

  adicionarCarrinho(){}
}
