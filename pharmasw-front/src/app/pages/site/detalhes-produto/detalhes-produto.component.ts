import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { TextAreaComponent } from '../../../components/text-area/text-area.component';
import { Filtros } from '../../../modelo/Filtros';
import { ImagemProduto } from '../../../modelo/ImagemProduto';
import { Produto } from '../../../modelo/Produto';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { AvaliacaoService } from './../../../services/avaliacao/avaliacao.service';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    CarouselComponent,
    CommonModule,
    InputPrimarioComponent,
    BotaoComponent,
    TextAreaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.css',
})
export class DetalhesProdutoComponent extends CrudService<Produto> {
  produtoId: string | null = null;
  imagens: ImagemProduto[] = [];
  produto: Produto;
  stars: string[] = [];
  quantidadeProduto: FormGroup;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {
    super(http, '/home-controle', toastrService);
    // Obtemos o ID do produto a partir da rota
    this.produtoId = this.route.snapshot.paramMap.get('id');
    // Aqui você pode fazer uma requisição para buscar os detalhes do produto usando o ID

    const filtro = new Filtros();
    filtro.id = parseInt(this.produtoId);
    filtro.nome = this.produtoId;
    this.listarUnico(filtro, '/listar-produto').subscribe((response: any) => {
      this.carregaImagens(response.imagens);
      response.imagens = null;
      this.produto = response;
    });
    this.iniciaForm();
  }

  private iniciaForm() {
    this.quantidadeProduto = new FormGroup({
      quantidade: new FormControl(1, Validators.required),
    });
  }

  private carregaImagens(imagens: [string[]]): void {
    imagens.forEach((img) => {
      let image = new ImagemProduto();
      image.imagem = img;
      this.imagens.push(image);
    });
  }

  generateStars(): string[] {
    return this.avaliacaoService.generateStars(this.produto);
  }

  comprar() {
    let quantidade = parseInt(this.quantidadeProduto.value.quantidade);
    if(quantidade == 0){
      quantidade = 1;
    }
    this.carrinhoService.adicionar(this.produto, quantidade);
    this.router.navigate(["/carrinho"]);
  }

  apagarCarrinho(){
    localStorage.clear();
  }
}
