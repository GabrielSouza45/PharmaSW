import { CrudService } from './../../services/crud-service.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { Filtros } from '../../modelo/Filtros';
import { Produto } from '../../modelo/Produto';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule,
    ModalComponent
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css'
})
export class PaginaProdutosComponent extends CrudService<Produto>{
  buscarForm!: FormGroup;
  produtos: any[] = [];
  modalAberto: boolean = false;
  formProduto: FormGroup;
  private filtros: Filtros;
  clickCadastro: boolean = true;
  usuarioLogado: boolean = false;
  administrador: boolean = sessionStorage.getItem("grupo") == "ADMINISTRADOR";

  constructor(
    private toastrService: ToastrService,
    private http: HttpClient
  ) {
console.log(sessionStorage.getItem("grupo"));

    super(http, "/produto-controle");

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl('')
    });

    this.formProduto = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      quantidade: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });

    this.pesquisar();
  }

  getProduto() {
    return new Produto(
      this.formProduto.value.preco,
      this.formProduto.value.descricao,
      this.formProduto.value.quantidade,
      this.formProduto.value.categoria
    );
  }


  // PESQUISAR
  pesquisar() {
    this.filtros = new Filtros();
    this.filtros.nome = this.buscarForm.value.nome || null,
      this.filtros.status = this.buscarForm.value.status || null,

      this.listar(this.filtros, "/listar-produtos")
        .subscribe((response: any) => {
          this.produtos = response;
          console.log(response);

        });

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach(radio => (radio as HTMLInputElement).checked = false);
    this.buscarForm.value.status = null;
  }


  // CADASTRAR
  cadastrar() { }

  // MUDAR STATUS
  mudarStatus(event: { id: number }): void {
    const { id } = event;

    this.filtros = new Filtros();
    this.filtros.id = id;

    this.editarStatus(this.filtros, "/mudar-status").subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Status alterado com sucesso!");
        } else if (statusCode === 404) {
          this.toastrService.error("Produto não encontrado.");
        } else {
          this.toastrService.warning("Erro inesperado.");
        }
        this.pesquisar();
      },
      error: (error) => {
        console.error("Erro ao alterar o status do produto", error);
        this.toastrService.error("Erro ao alterar o status do produto. Tente novamente mais tarde.");
      }
    });
  }

  // EDITAR PRODUTO
  alterarProduto() {
    if (!this.checkFormErrors()) {
      return;
    }

    this.editar(this.getProduto(), "/editar-produto").subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Produto alterado com sucesso!");
        } else if (statusCode === 404) {
          this.toastrService.error("Produto não encontrado.");
        } else {
          this.toastrService.warning("Erro inesperado.");
        }
        this.pesquisar();
        this.modalAberto = false;
      },
      error: (error) => {
        console.error("Erro ao alterar o produto", error);
        this.toastrService.error("Erro ao alterar o produto. Tente novamente mais tarde.");
      }
    });
    this.clickCadastro = true;
  }

  // CONTROLE DO MODAL DE CADASTRO/EDIÇÃO {
  resetaModal(){
    this.formProduto.patchValue({
      nome: null,
      categoria: null,
      valor: null,
      peso: null
    });
  }

  mudaEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      this.alterarProduto();
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
    this.usuarioLogado = (sessionStorage.getItem("id") == item.id.toString())
  }

  fecharModal() {
    this.modalAberto = false;
  }

  checkFormErrors(): boolean {
    let valido = true;
    const controls = this.formProduto.controls;



    if (controls['preco']?.errors?.['required']) {
      this.toastrService.warning("O campo preço é obrigatório.");
      valido = false;
    }

    if (controls['descricao']?.errors?.['required']) {
      this.toastrService.warning("O campo descrição é obrigatório.");
      valido = false;
    }

    if (controls['quantidade']?.errors?.['required']) {
      this.toastrService.warning("O campo quantidade é obrigatório.");
      valido = false;
    }

    if (controls['categoria']?.errors?.['required']) {
      this.toastrService.warning("O campo categoria é obrigatório.");
      valido = false;
    }

    return valido;
  }
}
