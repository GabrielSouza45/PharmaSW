import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentType, ToastrService } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { PaginaInicialLayoutComponent } from '../../../components/back-office/pagina-inicial-layout/pagina-inicial-layout.component';
import { PopupComponent } from '../../../components/popup/popup.component';
import { PreviewProdutoComponent } from '../../../components/back-office/preview-produto/preview-produto.component';
import { TablePaginationComponent } from '../../../components/back-office/table-pagination/table-pagination.component';
import { Grupo } from '../../../modelo/enums/Grupo';
import { Status } from '../../../modelo/enums/Status';
import { Filtros } from '../../../modelo/Filtros';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { CadastroProdutosComponent } from '../cadastro-produtos/cadastro-produtos.component';
import { Produto } from '../../../modelo/Produto';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule,
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css',
})
export class PaginaProdutosComponent extends CrudService<Produto> {
  buscarForm!: FormGroup; // Formulário com filtro para pesquisa
  formProduto!: FormGroup; // Formulario para cadastro e alteração
  produtos: Produto[] = []; // Aqui serão recebidos os produtos do back
  isAdministrador: boolean =
    sessionStorage.getItem('grupo') === Grupo.ADMINISTRADOR;
  pagina: number = 1; // Usado para o pageable
  totalItens: number = 10; // Usado para o pageable
  acoesPermitidas: any[]; // Ações permitidas para o usuario sobre o produto

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    super(http, '/produto-controle', toastrService);

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl(''),
    });
    this.carregaAcoesPermitidas();
    this.pesquisar();
  }

  carregaAcoesPermitidas() {
    const alterar = [
      {
        nome: (item: Produto) => 'Alterar',
        icone: (item: Produto) => 'bi bi-pencil-square',
        funcao: (item: Produto) => this.abrirModalEdicao(item),
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

  // PAGEABLE
  pageChanged(page: number) {
    this.pagina = page;
    this.pesquisar();
  }

  // PESQUISAR
  pesquisar() {
    const filtros = new Filtros();
    filtros.nome = this.buscarForm.value.nome || null;
    filtros.status = this.buscarForm.value.status || null;
    filtros.pagina = this.pagina;

    this.listar(filtros, '/listar-produtos-pagination').subscribe(
      (response: any) => {
        this.produtos = response.content;

        this.totalItens = response.totalElements;
      }
    );

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach((radio) => ((radio as HTMLInputElement).checked = false));
    this.buscarForm.value.status = null;
  }

  // VISUALIZAR
  visualizar(produto: Produto) {
    const filtro = new Filtros();
    filtro.id = produto.id;
    this.listar(filtro, '/listar-produtos').subscribe({
      next: (resp: any) => {
        this.dialog.open(PreviewProdutoComponent, { data: { produto: resp } });
      },
    });
  }

  // MUDAR STATUS
  mudarStatus(produto: Produto): void {
    const dados = { tituloPopup: 'Deseja prosseguir?' };

    this.abrirComponent(dados, PopupComponent).subscribe((response) => {
      if (response === 'confirmar') {
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
    });
  }

  // CONTROLE DO MODAL DE CADASTRO/EDIÇÃO {
  // CADASTAR PRODUTO
  abrirCadastro() {
    const dados = {
      funcaoCadastro: true,
    };
    this.abrirComponent(dados, CadastroProdutosComponent).subscribe(() => {
      this.pesquisar();
    });
  }

  // EDITAR PRODUTO
  abrirModalEdicao(produto: Produto): void {
    const dados = {
      funcaoCadastro: false,
      produto: produto,
    };
    this.abrirComponent(dados, CadastroProdutosComponent).subscribe(() => {
      this.pesquisar();
    });
  }

  // }

  private abrirComponent(
    dados: any,
    component: ComponentType<any>
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data: dados,
    });
    // Escutando o resultado após fechar o modal
    return dialogRef.afterClosed();
  }
}
