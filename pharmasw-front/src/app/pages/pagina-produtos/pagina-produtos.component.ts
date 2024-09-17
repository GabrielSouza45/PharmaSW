import { CrudService } from './../../services/crud-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { Grupo } from '../../modelo/enums/Grupo';
import { Status } from '../../modelo/enums/Status';
import { Filtros } from '../../modelo/Filtros';
import { Produto } from '../../modelo/Produto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CrudService } from '../../services/crud-service/crud-service.service';
import { Produto } from './../../modelo/Produto';
import { FormCheckerService } from '../../services/form-checker/form-checker.service';
import { CadastroProdutosComponent } from '../cadastro-produtos/cadastro-produtos.component';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule,
    ModalComponent,
    CadastroProdutosComponent
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css',
})
export class PaginaProdutosComponent extends CrudService<Produto> {
  buscarForm!: FormGroup; // Formulário com filtro para pesquisa
  formProduto!: FormGroup; // Formulario para cadastro e alteração
  produtos: Produto[] = []; // Aqui serão recebidos os produtos do back
  modalAberto: boolean = false; // Controla a abertura e fechamento do modal de cadastro
  clickCadastro: boolean = true; // Define se o botão do modal será para cadastrar ou alterar
  isAdministrador: boolean =
    sessionStorage.getItem('grupo') === Grupo.ADMINISTRADOR;
  pagina: number = 1; // Usado para o pageable
  totalItens: number = 10; // Usado para o pageable
  acoesPermitidas: any[]; // Ações permitidas para o usuario sobre o produto

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private formChecker: FormCheckerService
  ) {
    super(http, '/produto-controle', toastrService);

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl(''),
    });

    this.formProduto = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      valor: new FormControl(0.0, [Validators.required]),
      peso: new FormControl(0.0, [Validators.required]),
      fabricante: new FormControl('', [Validators.required]),
      quantidadeEstoque: new FormControl(0, [Validators.required]),
    });

    this.carregaAcoesPermitidas();
    this.pesquisar();
  }

  carregaAcoesPermitidas() {
    const alterar = [
      {
        nome: (item: Produto) => 'Alterar',
        icone: (item: Produto) => 'bi bi-pencil-square',
        funcao: (item: Produto) => this.alterarCadastro(item),
      },
    ];

    const alterarStatus = [
      {
        nome: (item: Produto) =>
          item.status === Status.ATIVO ? 'Inativar' : 'Ativar',
        icone: (item: Produto) =>
          item.status === Status.ATIVO
            ? 'bi bi-x-circle-fill'
            : 'bi bi-person-plus-fill',
        funcao: (item: Produto) => this.mudarStatus(item),
      },
    ];

    const visualizar = [
      {
        nome: (item: Produto) => 'Visualizar',
        icone: (item: Produto) => 'bi bi-eye-fill',
        funcao: (item: Produto) => this.visualizar(item),
      },
    ];

    if (this.isAdministrador) {
      this.acoesPermitidas = alterar.concat(alterarStatus).concat(visualizar);
    } else {
      this.acoesPermitidas = alterar;
    }
  }

  // PESQUISAR
  pesquisar() {
    const filtros = new Filtros();
    filtros.nome = this.buscarForm.value.nome || null;
    filtros.status = this.buscarForm.value.status || null;
    filtros.pagina = this.pagina;

    this.listar(filtros, '/listar-produtos').subscribe((response: any) => {
      this.produtos = response.content;

      this.totalItens = response.totalElements;
    });

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach((radio) => ((radio as HTMLInputElement).checked = false));
    this.buscarForm.value.status = null;
  }

  // PAGEABLE
  pageChanged(page: number) {
    this.pagina = page;
    this.pesquisar();
  }

  // VISUALIZAR
  visualizar(produto: Produto) {}

  // CADASTRAR
  cadastrar() {}

  // MUDAR STATUS
  mudarStatus(produto: Produto): void {
    let id = produto.id;
    const filtros = new Filtros();
    filtros.id = id;

    this.editarStatus(filtros, '/mudar-status').subscribe({
      next: () => {
        this.pesquisar();
      },
      error: (error) => {
        console.error('Erro ao alterar o Produto', error);
        this.toastrService.error(
          'Erro ao alterar o Produto. Tente novamente mais tarde.'
        );
      },
    });
  }

  // EDITAR PRODUTO
  abrirModalEdicao(event: { item: any }): void {
    const { item } = event;

    this.resetaFormulario();
    this.modalAberto = true;
    this.clickCadastro = false;
  }

  alterarCadastro(produto: Produto) {

  }

  // CONTROLE DO MODAL DE CADASTRO/EDIÇÃO {
  resetaFormulario() {
    this.formProduto.patchValue({
      nome: null,
      categoria: null,
      valor: null,
      peso: null,
    });
  }

  mudaEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      // this.alterarCadastro();
    }
  }

  abrirCadastro() {
    this.resetaFormulario();
    this.clickCadastro = true;
    this.modalAberto = true;
  }



  fecharModal() {
    this.modalAberto = false;
  }
  // }

  // private getProduto() {
  //   return new Produto(
  //     this.formProduto.value.nome,
  //     this.formProduto.value.categoria,
  //     this.formProduto.value.valor,
  //     this.formProduto.value.peso,
  //     this.formProduto.value.fabricante,
  //     this.formProduto.value.quantidadeEstoque
  //   );
  // }
}
