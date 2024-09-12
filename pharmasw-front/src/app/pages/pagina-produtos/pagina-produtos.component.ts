import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { Filtros } from '../../modelo/Filtros';
import { ProdutoService } from '../../services/produto/produto.service'; // Serviçinho pra produto feito
import { Produto } from '../../modelo/Produto'; // Modelo Produto, quero checar se serão esses atributos mesmo
import { HttpResponse } from '@angular/common/http';

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

export class PaginaProdutosComponent {
  buscarForm!: FormGroup;
  produtos: any[] = [];
  modalAberto: boolean = false;
  formCadastroProduto: FormGroup;
  private filtros: Filtros;
  private produto: Produto;
  clickCadastro: boolean = true;

  constructor(private produtoService: ProdutoService,
    private toastrService: ToastrService
  ) {

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl('')
    });

    this.formCadastroProduto = new FormGroup({
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
      this.formCadastroProduto.value.preco,
      this.formCadastroProduto.value.descricao,
      this.formCadastroProduto.value.quantidade,
      this.formCadastroProduto.value.categoria
    );
  }

  // PESQUISAR
  pesquisar() {
    this.filtros = new Filtros();
    this.filtros.nome = this.buscarForm.value.nome || null;
    this.filtros.status = this.buscarForm.value.status || null;

    this.produtoService.listar(this.filtros)
      .subscribe(dados => { this.produtos = dados });

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach(radio => (radio as HTMLInputElement).checked = false);
    this.buscarForm.value.status = null;
  }

  // CADASTRAR
  cadastrar() {
    if (!this.checkFormErrors()) {
      return;
    }

    this.produtoService.cadastrar(this.getProduto()).subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 201) {
          this.toastrService.success("Produto cadastrado com sucesso!");
          this.modalAberto = false;
        } else {
          this.toastrService.warning("Erro inesperado ao cadastrar o produto.");
        }
        this.pesquisar();
      },
      error: (error) => {
        console.error("Erro ao cadastrar o produto", error);
        this.toastrService.error("Erro ao criar o produto. Tente novamente mais tarde.");
      }
    });
  }

  // MUDAR STATUS
  mudarStatus(event: { id: number }): void {
    const { id } = event;

    this.filtros = new Filtros();
    this.filtros.id = id;

    this.produtoService.mudarStatus(this.filtros).subscribe({
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
  mudaEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      this.alterarProduto();
    }
  }

  abrirModalEdicao(event: { item: any }): void {
    const { item } = event;

    this.formCadastroProduto.patchValue({
      nome: item.nome,
      preco: item.preco,
      descricao: item.descricao,
      quantidade: item.quantidade,
      categoria: item.categoria
    });
    this.modalAberto = true;
    this.clickCadastro = false;
  }

  alterarProduto() {
    if (!this.checkFormErrors()) {
      return;
    }

    this.produtoService.editar(this.getProduto()).subscribe({
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

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  checkFormErrors(): boolean {
    let valido = true;
    const controls = this.formCadastroProduto.controls;



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
