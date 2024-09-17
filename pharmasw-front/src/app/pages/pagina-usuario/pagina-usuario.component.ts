import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
import { cpfValidator } from '../../infra/validators/cpf-validator';
import { Status } from '../../modelo/enums/Status';
import { Filtros } from '../../modelo/Filtros';
import { CrudService } from '../../services/crud-service/crud-service.service';
import { Usuario } from './../../modelo/Usuario';
import { FormCheckerService } from './../../services/form-checker/form-checker.service';

@Component({
  selector: 'app-pagina-usuario',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './pagina-usuario.component.html',
  styleUrl: './pagina-usuario.component.css',
})
export class PaginaUsuarioComponent extends CrudService<Usuario> {
  buscarForm!: FormGroup;
  formCadastroUsuario!: FormGroup;
  usuarios: Usuario[] = [];
  modalAberto: boolean = false;
  clickCadastro: boolean = true;
  usuarioLogado: boolean = false;
  totalItens: number = 10;
  pagina: number = 1;

  acoes = [
    {
      nome: (item: Usuario) => 'Alterar',
      icone: (item: Usuario) => 'bi bi-pencil-square',
      funcao: (item: Usuario) => this.abrirModalEdicao(item),
    },
    {
      nome: (item: Usuario) =>
        item.status === Status.ATIVO ? 'Inativar' : 'Ativar',
      icone: (item: Usuario) =>
        item.status === Status.ATIVO
          ? 'bi bi-x-circle-fill'
          : 'bi bi-person-plus-fill',
      funcao: (item: Usuario) => this.mudarStatus(item),
    },
  ];

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private formChecker: FormCheckerService
  ) {
    super(http, '/usuario-controle', toastrService);

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl(''),
    });

    this.formCadastroUsuario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, cpfValidator()]),
      grupo: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmarSenha: new FormControl('', [Validators.required]),
    });

    this.pesquisar();
  }

  // PESQUISAR
  pesquisar() {
    const filtros = new Filtros();
    filtros.nome = this.buscarForm.value.nome || null;
    filtros.status = this.buscarForm.value.status || null;
    filtros.pagina = this.pagina;

    this.listar(filtros, '/listar').subscribe((response: any) => {
      this.usuarios = response.body.content;
      this.totalItens = response.body.totalElements;
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

  // CADASTRAR
  cadastrar() {
    console.log(this.formCadastroUsuario.value);

    if (
      !this.formChecker.senhaValida(this.formCadastroUsuario) ||
      !this.formChecker.checkFormErrorsUsuario(this.formCadastroUsuario)
    ) {
      return;
    }

    this.adicionar(this.getUsuario(), '/cadastrar').subscribe({
      next: (response: HttpResponse<any>) => {
        this.modalAberto = false;
        this.pesquisar();
      },
      error: (error) => {
        console.error('Erro ao adicionar Usuário.', error);
        this.toastrService.error(
          'Erro ao adicionar Usuário. Tente novamente mais tarde.'
        );
      },
    });
  }

  // MUDAR STATUS
  mudarStatus(usuario: Usuario): void {
    let id = usuario.id;

    if (sessionStorage.getItem('id') == id.toString()) {
      this.toastrService.warning('Você não pode inativar a si mesmo.');
      return;
    }

    const filtros = new Filtros();
    filtros.id = id;

    this.editarStatus(filtros, '/mudar-status').subscribe({
      next: () => {
        this.pesquisar();
      },
      error: (error) => {
        console.error('Erro ao alterar o status.', error);
        this.toastrService.error(
          'Erro ao alterar o status. Tente novamente mais tarde.'
        );
      },
    });
  }

  // EDITAR USUARIO
  // aqui é aberto o modal para edicao
  abrirModalEdicao(usuario: Usuario): void {
    this.formCadastroUsuario.patchValue({
      nome: usuario.nome,
      email: usuario.email,
      senha: null,
      confimarSenha: null,
      cpf: usuario.cpf.toString(),
      grupo: usuario.grupo,
    });
    this.modalAberto = true;
    this.clickCadastro = false;
    this.usuarioLogado = sessionStorage.getItem('id') == usuario.id.toString();
  }

  // Esse é o botao submit que vem do modal, como o modal é generico,
  // aqui é definido se o submit do modal será tratado como cadastro ou edicao
  mudaEstadoClick(): void {
    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      this.alterarCadastro();
    }
  }

  // Aqui é a logica cara alterar o usuario
  alterarCadastro() {
    if (!this.formChecker.checkFormErrorsUsuario(this.formCadastroUsuario)) {
      return;
    }

    if (this.formCadastroUsuario.value.senha != null) {
      if (!this.formChecker.senhaValida(this.formCadastroUsuario)) return;
    }

    this.editar(this.getUsuario(), '/editar').subscribe({
      next: (response: HttpResponse<any>) => {
        this.pesquisar();
        this.modalAberto = false;
      },
      error: (error) => {
        console.error('Erro ao alterar o usuário', error);
        this.toastrService.error(
          'Erro ao alterar o usuário. Tente novamente mais tarde.'
        );
      },
    });
    this.clickCadastro = true;
  }

  // CONTROLE DO MODAL
  abrirModal() {
    this.formCadastroUsuario.reset();
    this.clickCadastro = true;
    this.usuarioLogado = false;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  private getUsuario() {
    return new Usuario(
      this.formCadastroUsuario.value.nome,
      this.formCadastroUsuario.value.email,
      this.formCadastroUsuario.value.senha,
      this.formCadastroUsuario.value.cpf,
      this.formCadastroUsuario.value.grupo
    );
  }
}
