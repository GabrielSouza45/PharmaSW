import { Produto } from './../../modelo/Produto';
import { Component, Inject } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ImagemProduto } from '../../modelo/ImagemProduto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from '../../services/crud-service/crud-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ImagemService } from '../../services/imagem/imagem.service';
import { Filtros } from '../../modelo/Filtros';
import { CommonModule } from '@angular/common';
import { BotaoComponent } from '../botao/botao.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-preview-produto',
  standalone: true,
  imports: [CarouselComponent, CommonModule, BotaoComponent],
  templateUrl: './preview-produto.component.html',
  styleUrl: './preview-produto.component.css',
})
export class PreviewProdutoComponent extends ImagemService<ImagemProduto> {
  imagens: ImagemProduto[] = [];
  produto: Produto;
  estrelas: string[];

  constructor(
    public dialogRef: MatDialogRef<PreviewProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    http: HttpClient,
    toastr: ToastrService,
  ) {
    super(http);

    const crudService = new CrudService<Produto>(http, "/produto-controle", toastr);

  const filtro = new Filtros();
  filtro.id = data.produto.id
    crudService.listar(filtro, "/listar-produtos").subscribe((resp: any) => {
      console.log(resp);

      this.produto = resp;
      this.carregaCarrossel();
      console.log('teste', this.produto);
      this.generateStars();
    });

  }

  carregaCarrossel() {
    const filtro = new Filtros();
    filtro.id = this.produto.id;
    this.listar(filtro).subscribe((response: ImagemProduto[]) => {
      if (response.length == 0) {
        const img = new ImagemProduto();
        img.caminho = '../../../assets/logo-com-fundo.png';
        this.imagens.push(img);
      } else this.imagens = response;
    });
  }

  voltar() {
    this.dialogRef.close('voltar');
  }

  generateStars(): void {
    const fullStars = Math.floor(this.produto.avaliacao); // Número de estrelas cheias
    const hasHalfStar = this.produto.avaliacao % 1 !== 0; // Verifica se há meia estrela
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

    console.log(stars);

    this.estrelas = stars;
  }
}
