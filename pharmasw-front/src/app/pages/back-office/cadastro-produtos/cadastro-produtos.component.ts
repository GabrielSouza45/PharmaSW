import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Grupo } from '../../../modelo/enums/Grupo';
import { Filtros } from '../../../modelo/Filtros';
import { ImagemProduto } from '../../../modelo/ImagemProduto';
import { Produto } from '../../../modelo/Produto';
import { ImagemService } from '../../../services/imagem/imagem.service';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TextAreaComponent } from '../../../components/text-area/text-area.component';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { FormCheckerService } from '../../../services/form-checker/form-checker.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css',
})
export class CadastroProdutosComponent extends CrudService<Produto> {
  funcaoCadastro: boolean = this.data.funcaoCadastro;
  produtoEdicao: Produto | null = this.data.produto;
  tituloModal: string =
    (this.data.funcaoCadastro ? 'Cadastro' : 'Editar') + ' - Produto';
  textoBotaoModal: string = this.data.funcaoCadastro ? 'Cadastrar' : 'Editar';

  imagens: ImagemProduto[] = [];
  formProduto!: FormGroup;
  usuarioEstoque: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CadastroProdutosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private toastrService: ToastrService,
    private imagemService: ImagemService<ImagemProduto>,
    private checker: FormCheckerService
  ) {
    super(http, '/produto-controle', toastrService);
    this.usuarioEstoque = sessionStorage.getItem('grupo') == Grupo.ESTOQUISTA;
    this.criarImagemPadrao();
    this.formProduto = this.iniciarForm();
    this.limparFormulario();
    if (!data.funcaoCadastro) {
      this.iniciaFormularioEdicao();
    }
  }

  // INICIALIZACAO DO COMPONENT {
  iniciarForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', [Validators.required]),
      fabricante: new FormControl('', [Validators.required]),
      valor: new FormControl(0.0, [Validators.required, Validators.min(0)]),
      quantidadeEstoque: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      avaliacao: new FormControl(0.0, [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
      imagemPrincipal: new FormControl(''),
    });
  }

  iniciaFormularioEdicao() {
    if (this.produtoEdicao) {
      const filtro = new Filtros();
      filtro.id = this.produtoEdicao.id;
      this.listarUnico(filtro, '/listar-produtos').subscribe(
        (response: any) => {
          this.produtoEdicao = response;
          this.carregaFormulario();
        }
      );
      this.imagemService
        .listar(filtro)
        .subscribe((response: ImagemProduto[]) => {
          this.imagens = [];
          this.imagens = response;
        });
    } else {
      this.toastrService.error('Erro ao carregar formulário!');
    }
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
      icone: (image: ImagemProduto) =>
        this.usuarioEstoque ? '' : 'bi bi-trash3',
      funcao: (image: ImagemProduto) =>
        this.usuarioEstoque ? null : this.removerImagem(image),
    },
    {
      icone: (image: ImagemProduto) =>
        this.usuarioEstoque
          ? ''
          : image.principal
            ? 'bi bi-star-fill gold-star'
            : 'bi bi-star',
      funcao: (image: ImagemProduto) =>
        this.usuarioEstoque ? null : this.setPrincipal(image),
    },
  ];
  // } FIM INICIALIZACAO DO COMPONENT



  //  REMOVER IMAGEM
  removerImagem(image: ImagemProduto) {
    if (!this.funcaoCadastro) {
      //código exclusão
      this.imagemService.excluir(image).subscribe({
        next: (response: any) => {
          this.toastrService.success('Imagem foi removida com sucesso!');
        }
      })
    }
    this.apagarImagemLista(image);
  }

  apagarImagemLista(image: ImagemProduto) {
    let index = this.imagens.indexOf(image);
    this.imagens.splice(index, 1);

    if (this.imagens.length == 0) {
      this.criarImagemPadrao();
    }
  }


  // CADASTRAR
  cadastrar() {
    if (!this.checker.checkFormErrorsProdutos(this.formProduto)) return

    const formData = new FormData();

    this.formProduto.value.valor = Number(this.formProduto.value.valor);
    this.formProduto.value.quantidadeEstoque = Number(
      this.formProduto.value.quantidadeEstoque
    );
    this.formProduto.value.avaliacao = Number(this.formProduto.value.avaliacao);

    // Adiciona o JSON do produto
    const produtoJson = JSON.stringify(this.formProduto.value);
    formData.append('produto', produtoJson);



    // Adiciona as imagens
    if (this.imagens[0].caminho != '../assets/logo-com-fundo.png') {
      this.imagens.forEach((imagem) => {
        formData.append('imagens', imagem.arquivo);
      });
    }

    this.adicionar(formData, '/cadastrar').subscribe({
      next: (response: HttpResponse<any>) => {
        this.dialogRef.close('cadastrado');
      },
      error: (error) => {
        this.toastrService.error(
          'Erro ao adicionar Usuário. Tente novamente mais tarde.'
        );
      },
    });
  }

  // CONTROLE DO MODAL {
  mudarEstadoClick(): void {

    if (this.funcaoCadastro) {
      this.cadastrar();
    } else {
      this.alterarProduto();
    }
  }

  fecharModal() {
    this.dialogRef.close();
  }
  // } FIM CONTROLE DO MODAL

  //EDIÇÃO DE QUANTIDADES ESTOQUE
  alterarProduto() {
    if (this.usuarioEstoque) {
      const produtoEditado = this.getProduto();
      produtoEditado.id = this.produtoEdicao.id;
      this.editar(produtoEditado, '/alterar-quantidade').subscribe({
        next: (response: HttpResponse<any>) => {
          this.limparFormulario();
          this.dialogRef.close('editado');
        },
        error: (error) => {
          this.toastrService.error(
            'Erro ao alterar o produto. Tente novamente mais tarde.'
          );
        },
      });
    } else {
      // COLOCAR LOGICA DE ALTERACAO DO USUARIO ADMIN AQUI!!!
      const produtoEditado = this.getProduto();
      produtoEditado.id = this.produtoEdicao.id;
      produtoEditado.imagemPrincipal = this.formProduto.value.imagemPrincipal;

      produtoEditado.valor = Number(produtoEditado.valor);
      produtoEditado.quantidadeEstoque = Number(produtoEditado.quantidadeEstoque);
      produtoEditado.avaliacao = Number(produtoEditado.avaliacao);
      delete produtoEditado.quantidadePedido;

      const formData = new FormData();
      let imagensEditar:ImagemProduto[]=[];

      // Adiciona o JSON do produto
      const produtoJson = JSON.stringify(produtoEditado);
      formData.append('produto', produtoJson);

      // Adiciona as imagens
      if (this.imagens[0].caminho != '../assets/logo-com-fundo.png') {
        this.imagens.forEach((imagem) => {
          if(imagem.id){
           imagensEditar.push(imagem);
          }
          else{
            formData.append('imagens', imagem.arquivo);
          }
        });
        formData.append('imagensEdicao', JSON.stringify(imagensEditar));
      }

      this.editar(formData, '/alterar-produto').subscribe({
        next: (response: HttpResponse<any>) => {
          this.limparFormulario();
          this.dialogRef.close('editado');
        },
        error: (error) => {
          this.toastrService.error(
            'Erro ao alterar o produto. Tente novamente mais tarde.'
          );
        },
      });
    }
  }



  // CARROSSEL DE IMAGENS {
  //  MUDAR IMAGEM PRINCIPAL
  setPrincipal(image: ImagemProduto) {
    this.imagens.forEach((imagem) => {
      if (imagem == image) {
        if (!imagem.principal) {
          imagem.principal = true;
          this.formProduto.value.imagemPrincipal = image.nomeOriginal;
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

        this.imagens.forEach((img) => {
          if (img.arquivo == file) {
            return;
          }
        });

        let imagem = new ImagemProduto();
        imagem.principal = false;
        imagem.nomeOriginal = file.name;

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
  // } FIM CARROSSEL DE IMAGENS

  private getProduto(): Produto {
    return new Produto(
      this.formProduto.value.nome,
      this.formProduto.value.valor,
      this.formProduto.value.fabricante,
      this.formProduto.value.descricao,
      this.formProduto.value.avaliacao,
      this.formProduto.value.quantidadeEstoque
    );
  }

  private limparFormulario(): void {
    this.formProduto.patchValue({
      nome: null,
      valor: null,
      quantidadeEstoque: null,
      descricao: null,
      avaliacao: null,
    });
  }

  private carregaFormulario(): void {
    this.formProduto.patchValue({
      nome: this.produtoEdicao.nome,
      fabricante: this.produtoEdicao.fabricante,
      valor: this.produtoEdicao.valor,
      quantidadeEstoque: this.produtoEdicao.quantidadeEstoque,
      descricao: this.produtoEdicao.descricao,
      avaliacao: this.produtoEdicao.avaliacao,
    });
  }
}
