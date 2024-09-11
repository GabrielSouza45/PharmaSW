import { Component, OnInit } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Filtros } from '../../modelo/Filtros';
import { ProdutoService } from '../../services/produto/produto.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Produto } from '../../modelo/Produto';
import { ToastrService } from 'ngx-toastr';

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
    HttpClientModule
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrls: ['./pagina-produtos.component.css']
})


export class PaginaProdutosComponent{
  modalAberto : boolean = false;
  produtosForm!: FormGroup;
  produtos: any[] = [];
  private filtros: Filtros;
  private produto: ProdutoService;
  buscarForm: FormGroup;
  clickCadastro: boolean = true;

  constructor(
    private produtoService: ProdutoService,
    private toastrService: ToastrService
  ) {
    this.filtros = new Filtros();
    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl('')
    });

    this.produtosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      qtd: new FormControl('', Validators.required)
    });

    this.pesquisar();
  }


  getProduto(){
    return new Produto(
      this.produtosForm.value.nome,
      this.produtosForm.value.avaliacao,
      this.produtosForm.value.descricao,
      this.produtosForm.value.number,
      this.produtosForm.value.qtd,
    );
  }

  pesquisar() {
    if (this.produtosForm.invalid) {
      this.toastrService.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.filtros.nome = this.buscarForm.value.nome;
    this.filtros.status = this.buscarForm.value.status;

    this.produtoService.listar(this.filtros).subscribe(dados => {
      this.produtos = dados;
    });

    this.buscarForm.reset();
  }


    //mudar status
    mudarStatus(event:{id: number}): void{
      const {id} = event;
      this.filtros = new Filtros();
      this.filtros.id = id;

      this.produtoService.mudarStatus(this.filtros).subscribe({
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
      console.error("Erro ao alterar o produto", error);
      this.toastrService.error("Erro ao alterar o produto. Tente novamente mais tarde.");
    }});
  }

  //Editar Produto
  mudarEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      this.alterarCadastro();
    }
  }


  abrirModalEdicao(event: {item: any}): void{
    const {item} = event;
    console.log(item);

    this.produtosForm.patchValue({
      nome: item.nome,
      avaliacao: item.avaliacao,
      descricao: item.descricao,
      number: item.number,
      qtd: item.qtd
    });

  this.modalAberto = true;
  this.clickCadastro = false;
  }

  alterarCadastro() {
    if (!this.checkFormErros()) {
      return;
    }

    this.produtoService.editar(this.getProduto()).subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Produto alterado com sucesso!");
        } else if (statusCode === 400) {
          this.toastrService.error("Erro na solicitação!");
        } else if (statusCode === 404) {
          this.toastrService.error("Produto não encontrado!");
        } else {
          this.toastrService.warning("Resposta inesperada do servidor!");
        }

        this.pesquisar();
        this.modalAberto = false;
      },
      error: (error: any) => {
        console.error("Erro ao alterar o produto", error);
        this.toastrService.error("Erro ao alterar o produto. Tente novamente mais tarde");
      }
    });

    this.clickCadastro = true;
  }


  abrirModal(){
    this.modalAberto = true;
  }

  fecharModal(){
    this.modalAberto = false;
  }

  checkFormErros(): boolean {
    let valido: boolean = true;
    const controls = this.produtosForm.controls;

    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning("O campo nome é obrigatório.");
      valido = false;
    }

    return valido;
  }


    cancelar() {
      // Lógica para cancelar o cadastro e voltar para a lista de produtos
    }

    cadastrar() {
      // Verificar se o formulário está válido
      if (this.produtosForm.invalid) {
        this.toastrService.error('Por favor, preencha todos os campos corretamente.');
        return;
      }

      console.log(this.produtosForm.value);

      // Enviar a requisição de cadastro ao serviço
      this.produtoService.cadastrar(this.getProduto()).subscribe({
        next: (response: HttpResponse<any>) => {
          const statusCode = response.status;

          if (statusCode === 201) {
            this.toastrService.success("Produto criado com sucesso!");
            this.modalAberto = false;
          } else if (statusCode === 400) {
            // Erro de solicitação
            this.toastrService.error("Erro na solicitação. Verifique os dados e tente novamente.");
          } else {
            this.toastrService.warning("Resposta inesperada do servidor.");
          }

          // Atualizar a lista de produtos após o cadastro
          this.pesquisar();
        },
        error: (error: any) => {
          console.error("Erro ao cadastrar o produto", error);
          this.toastrService.error("Erro ao criar o produto. Tente novamente mais tarde.");
        }
      });
    }

}
