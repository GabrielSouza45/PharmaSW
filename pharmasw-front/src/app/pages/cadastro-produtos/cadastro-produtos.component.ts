import { ToastrService } from 'ngx-toastr';
import { CrudService } from './../../services/crud-service/crud-service.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImagemProduto } from '../../modelo/ImagemProduto';
import { BotaoComponent } from './../../components/botao/botao.component';
import { CarouselComponent } from './../../components/carousel/carousel.component';
import { InputPrimarioComponent } from './../../components/input-primario/input-primario.component';
import { ModalComponent } from './../../components/modal/modal.component';
import { TextAreaComponent } from './../../components/text-area/text-area.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../modelo/Produto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Grupo } from '../../modelo/enums/Grupo';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [
    ModalComponent,
    CommonModule,
    InputPrimarioComponent,
    BotaoComponent,
    TextAreaComponent,
    CarouselComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css',
})
export class CadastroProdutosComponent extends CrudService<Produto> {
  @Output('fecharModal') fechaModal = new EventEmitter();
  @Output('atualizarTabela') atualizarTabela = new EventEmitter();
  @Input() openCadastro: boolean = false;
  @Input() clickCadastro: boolean = true;
  @Input() carregaFormulario: number; // Recebe o id do Produto

  imagens: ImagemProduto[] = [];
  formProduto!: FormGroup;
  usuarioEstoque: boolean = "false";

  constructor(private http: HttpClient, private toastrService: ToastrService) {

    super(http, "/produto-controle", toastrService);
    this.criarImagemPadrao();

    this.formProduto = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      valor: new FormControl(0.0, [Validators.required, Validators.min(0)]),
      quantidadeEstoque: new FormControl(0, [Validators.required, Validators.min(0)]),
      descricao: new FormControl("", [Validators.required]),
      avaliacao: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
      imagemPrincipal: new FormControl('')
    });

    this.usuarioEstoque = sessionStorage.getItem("grupo") == Grupo.ESTOQUISTA;
  }

  criarImagemPadrao(): void {
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

  //  REMOVER IMAGEM
  removerImagem(image: ImagemProduto) {
    let index = this.imagens.indexOf(image);
    this.imagens.splice(index, 1);

    if (this.imagens.length == 0) {
      this.criarImagemPadrao();
    }
  }

  cadastrar() {
    const formData = new FormData();

    this.formProduto.value.valor = Number(this.formProduto.value.valor);
    this.formProduto.value.quantidadeEstoque = Number(this.formProduto.value.quantidadeEstoque);
    this.formProduto.value.avaliacao = Number(this.formProduto.value.avaliacao);

    // Adiciona o JSON do produto
    const produtoJson = JSON.stringify(this.formProduto.value);
    formData.append('produto', produtoJson);

    // Adiciona as imagens
    this.imagens.forEach(imagem => {
      formData.append('imagens', imagem.arquivo);
    });


    this.adicionar(formData, "/cadastrar").subscribe({
      next: (response: HttpResponse<any>) => {
        this.fechaModal.emit();
        this.atualizarTabela.emit();
      },
      error: (error) => {
        console.error('Erro ao adicionar Usuário.', error);
        this.toastrService.error(
          'Erro ao adicionar Usuário. Tente novamente mais tarde.'
        );
      },
    })

  }



  // CARROSSEL DE IMAGENS {
  //  MUDAR IMAGEM PRINCIPAL
  setPrincipal(image: ImagemProduto) {
    this.imagens.forEach((imagem) => {
      if (imagem == image) {
        if (!imagem.principal) {
          imagem.principal = true;
          this.formProduto.value.imagemPrincipal = imagem.arquivo.name;
          return;
        }
        this.formProduto.value.imagemPrincipal = '';
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

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        this.imagens.forEach(img => {
          if (img.arquivo == file) {
            return;
          }
        });

        let imagem = new ImagemProduto();
        imagem.principal = false;
        imagem.id = i;

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
  // } CARROSSEL DE IMAGENS

  mudarEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      // this.alterarCadastro();
    }
  }

}
