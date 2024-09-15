import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { InputPrimarioComponent } from './components/input-primario/input-primario.component';
import { BotaoComponent } from './components/botao/botao.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ImagemProduto } from './modelo/ImagemProduto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ModalComponent,
    CommonModule,
    InputPrimarioComponent,
    BotaoComponent,
    TextAreaComponent,
    CarouselComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pharmasw-front';

  modalAberto = true;
  imagens: ImagemProduto[] = [];

  constructor() {
    let imagem = new ImagemProduto();
    imagem.id = 0;
    imagem.caminho = '../assets/logo-com-fundo.png';
    imagem.principal = true;

    this.imagens.push(imagem);
  }

  acoes = [
    {
      icone: (image: ImagemProduto) => 'bi bi-trash3',
      funcao: (image: ImagemProduto) => this.removerImagem(image),
    },
    {
      icone: (image: ImagemProduto) =>
        image.principal ? 'bi bi-star-fill gold-star' : 'bi bi-star',
      funcao: (image: ImagemProduto) => this.setPrincipal(image),
    },
  ];

  fecharModal() {}
  mudaEstadoClick() {}

  testar() {
    console.log(this.imagens);
  }

  //  REMOVER IMAGEM
  removerImagem(image: ImagemProduto) {
    let index = this.imagens.indexOf(image);
    this.imagens.splice(index, 1);
  }

  //  MUDAR IMAGEM PRINCIPAL
  setPrincipal(image: ImagemProduto) {
    this.imagens.forEach((imagem) => {
      if (imagem == image) {
        if (!imagem.principal) {
          imagem.principal = true;
          return;
        }
      }
      imagem.principal = false;
    });
  }

  // Usa o botão como gatilho para abrir o input file escondido
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Lida com os arquivos selecionados
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (this.imagens.length > 0) {
      if (this.imagens[0].caminho == '../assets/logo-com-fundo.png') {
        this.imagens = [];
      }
    }
    if (files && files.length > 0) {
      console.log('Arquivos selecionados:', files);

      for (let i = 0; i < files.length; i++) {
        let imagem = new ImagemProduto();
        imagem.principal = false;
        imagem.id = i;

        const file = files[i];
        const reader = new FileReader();
        imagem.arquivo = file;

        reader.onload = (e: any) => {
          imagem.caminho = e.target.result;
          // Armazena a URL da imagem no array
        };

        this.imagens.push(imagem);
        reader.readAsDataURL(file); // Converte o arquivo para uma URL válida
      }
    }
  }
}
