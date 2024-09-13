import { Produto } from './../../modelo/Produto';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { Filtros } from '../../modelo/Filtros';
import { CrudService } from '../../services/crud-service.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Status } from '../../modelo/enums/Status';

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
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css',
})
export class PaginaProdutosComponent extends CrudService<Produto> {
  buscarForm!: FormGroup;
  produtos: Produto[] = [];
  modalAberto: boolean = false;
  formProduto: FormGroup;
  private filtros: Filtros;
  clickCadastro: boolean = true;
  usuarioLogado: boolean = false;
  administrador: boolean = sessionStorage.getItem('grupo') == 'ADMINISTRADOR';

  acoes = [
    {
      nome: (item: Produto) => 'Alterar',
      icone: (item: Produto) => 'bi bi-pencil-square',
      funcao: (item: Produto) => this.alterarCadastro(item),
    },
    {
      nome: (item: Produto) =>
        item.status === Status.ATIVO ? 'Inativar' : 'Ativar',
      icone: (item: Produto) =>
        item.status === Status.ATIVO
          ? 'bi bi-x-circle-fill'
          : 'bi bi-person-plus-fill',
      funcao: (item: Produto) => this.mudarStatus(item),
    },
    {
      nome: (item: Produto) => 'Visualizar',
      icone: (item: Produto) => 'bi bi-eye-fill',
      funcao: (item: Produto) => this.visualizar(item),
    },
  ];

  constructor(private toastrService: ToastrService, private http: HttpClient) {
    super(http, '/produto-controle');

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

    this.pesquisar();
  }

  getProduto() {
    return new Produto(
      this.formProduto.value.nome,
      this.formProduto.value.categoria,
      this.formProduto.value.valor,
      this.formProduto.value.peso,
      this.formProduto.value.fabricante,
      this.formProduto.value.quantidadeEstoque
    );
  }

  // PESQUISAR
  pesquisar() {
    this.filtros = new Filtros();
    this.filtros.nome = this.buscarForm.value.nome || null;
    this.filtros.status = this.buscarForm.value.status || null;

    this.listar(this.filtros, '/listar-produtos').subscribe((response: any) => {
      this.produtos = response;
      console.log(response);
    });

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach((radio) => ((radio as HTMLInputElement).checked = false));
    this.buscarForm.value.status = null;
  }

  // VISUALIZAR
  visualizar(produto: Produto) {}

  // CADASTRAR
  cadastrar() {}

  // MUDAR STATUS
  mudarStatus(produto: Produto): void {
    let id = produto.id;
    this.filtros = new Filtros();
    this.filtros.id = id;

    this.editarStatus(this.filtros, "/mudar-status").subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Status alterado com sucesso!");
        } else if (statusCode === 400) {
          this.toastrService.error("Erro na solicitação. Id null.");
        } else if (statusCode === 404) {
          this.toastrService.error("Produto não encontrado.");
        } else {
          this.toastrService.warning("Resposta inesperada do servidor.");
        }
        this.pesquisar();

      },
      error: (error) => {
        console.error("Erro ao alterar o Produto", error);
        this.toastrService.error("Erro ao alterar o Produto. Tente novamente mais tarde.");
      }
    });
  }

  // EDITAR PRODUTO
  alterarCadastro(produto: Produto) {}

  // CONTROLE DO MODAL DE CADASTRO/EDIÇÃO {
  resetaModal() {
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

  abrirModal() {
    this.resetaModal();
    this.clickCadastro = true;
    this.usuarioLogado = false;
    this.modalAberto = true;
  }

  abrirModalEdicao(event: { item: any }): void {
    const { item } = event;
    console.log(item);

    this.resetaModal();
    this.modalAberto = true;
    this.clickCadastro = false;
    this.usuarioLogado = sessionStorage.getItem('id') == item.id.toString();
  }

  fecharModal() {
    this.modalAberto = false;
  }
  // }

  checkFormErrors(): boolean {
    let valido: boolean = true;
    const controls = this.formProduto.controls;

    // Verifica se há erros no campo 'nome'
    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning('O campo nome é obrigatório.');
      valido = false;
    }

    // Verifica se há erros no campo 'categoria'
    if (controls['categoria']?.errors) {
      if (controls['categoria'].errors['required']) {
        this.toastrService.warning('O campo de email é obrigatório.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'valor'
    if (controls['valor']?.errors) {
      if (controls['valor'].errors['required']) {
        this.toastrService.warning('O campo de valor é obrigatório.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'peso'
    if (controls['peso']?.errors?.['required']) {
      this.toastrService.warning('O campo de peso é obrigatório.');
      valido = false;
    }
    return valido;
  }
}
