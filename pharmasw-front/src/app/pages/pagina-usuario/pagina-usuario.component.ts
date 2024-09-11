import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { cpfValidator } from '../../infra/validators/cpf-validator';
import { passwordMatchValidator } from '../../infra/validators/senha-validator';
import { Filtros } from '../../modelo/Filtros';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from './../../modelo/Usuario';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pagina-usuario',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule,
    ModalComponent
  ],
  templateUrl: './pagina-usuario.component.html',
  styleUrl: './pagina-usuario.component.css'
})

export class PaginaUsuarioComponent {
  buscarForm!: FormGroup;
  usuarios: any[] = [];
  modalAberto: boolean = false;
  formCadastroUsuario: FormGroup;
  private filtros: Filtros;
  clickCadastro: boolean = true;
  usuarioLogado: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private toastrService: ToastrService
  ) {

    this.buscarForm = new FormGroup({
      nome: new FormControl(''),
      status: new FormControl('')
    });

    this.formCadastroUsuario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, cpfValidator()]),
      grupo: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmarSenha: new FormControl('', [Validators.required])
    });

    this.pesquisar();

  }

  getUsuario() {
    return new Usuario(
      this.formCadastroUsuario.value.nome,
      this.formCadastroUsuario.value.email,
      this.formCadastroUsuario.value.senha,
      this.formCadastroUsuario.value.cpf,
      this.formCadastroUsuario.value.grupo,
    );
  }


  // PESQUISAR
  pesquisar() {
    this.filtros = new Filtros();
    this.filtros.nome = this.buscarForm.value.nome || null,
      this.filtros.status = this.buscarForm.value.status || null,

      this.usuarioService.listar(this.filtros)
        .subscribe((response: any) => {
          this.usuarios = response.body;
          console.log(response.body);

        });

    const radios = document.querySelectorAll('input[name="status"]');
    radios.forEach(radio => (radio as HTMLInputElement).checked = false);
    this.buscarForm.value.status = null;
  }


  // CADASTRAR
  cadastrar() {

    console.log(this.formCadastroUsuario.value);

    if (!this.senhaValida() || !this.checkFormErrors()) {
      return;
    }

    this.usuarioService.cadastrar(this.getUsuario()).subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 201) {
          this.toastrService.success("Usuário criado com sucesso!");
          this.modalAberto = false;
        } else if (statusCode === 401) { // Código de status HTTP para erro de solicitação
          this.toastrService.error("Erro na solicitação. Verifique os dados e tente novamente.");
        } else {
          this.toastrService.warning("Resposta inesperada do servidor.");
        }
        this.pesquisar();
      },
      error: (error) => {
        console.error("Erro ao cadastrar o usuário", error);
        this.toastrService.error("Erro ao criar o usuário. Tente novamente mais tarde.");
      }
    });
  }


  // MUDAR STATUS
  mudarStatus(event: { id: number }): void {
    const { id } = event;
    if (sessionStorage.getItem("id") == id.toString()) {
      this.toastrService.warning("Você não pode inativar a si mesmo.");
      return;
    }

    this.filtros = new Filtros();
    this.filtros.id = id;

    this.usuarioService.mudarStatus(this.filtros).subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Status alterado com sucesso!");
        } else if (statusCode === 400) {
          this.toastrService.error("Erro na solicitação. Id null.");
        } else if (statusCode === 404) {
          this.toastrService.error("Usuário não encontrado.");
        } else {
          this.toastrService.warning("Resposta inesperada do servidor.");
        }
        this.pesquisar();

      },
      error: (error) => {
        console.error("Erro ao alterar o usuário", error);
        this.toastrService.error("Erro ao alterar o usuário. Tente novamente mais tarde.");
      }
    });

  }


  // EDITAR USUARIO
  mudaEstadoClick(): void {

    if (this.clickCadastro) {
      this.cadastrar();
    } else {
      this.alterarCadastro();
    }
  }

  abrirModalEdicao(event: { item: any }): void {
    const { item } = event;
    console.log(item);

    this.formCadastroUsuario.patchValue({
      nome: item.nome,
      email: item.email,
      senha: null,
      confimarSenha: null,
      cpf: item.cpf.toString(),
      grupo: item.grupo
    });
    this.modalAberto = true;
    this.clickCadastro = false;
    this.usuarioLogado = (sessionStorage.getItem("id") == item.id.toString())
  }

  alterarCadastro() {
    if(!this.checkFormErrors()){
      return;
    }
    console.log(this.formCadastroUsuario.value);

    if(this.formCadastroUsuario.value.senha != null){
      if(!this.senhaValida())
        return;
    }

    this.usuarioService.editar(this.getUsuario()).subscribe({
      next: (response: HttpResponse<any>) => {
        const statusCode = response.status;

        if (statusCode === 200) {
          this.toastrService.success("Usuário alterado com sucesso!");
        } else if (statusCode === 400) {
          this.toastrService.error("Erro na solicitação.");
        } else if (statusCode === 404) {
          this.toastrService.error("Usuário não encontrado.");
        } else {
          this.toastrService.warning("Resposta inesperada do servidor.");
        }
        this.pesquisar();
        this.modalAberto = false;

      },
      error: (error) => {
        console.error("Erro ao alterar o usuário", error);
        this.toastrService.error("Erro ao alterar o usuário. Tente novamente mais tarde.");
      }
    });
    this.clickCadastro = true;
  }


  abrirModal() {
    this.formCadastroUsuario.patchValue({
      nome: null,
      email: null,
      senha: null,
      confimarSenha: null,
      cpf: null,
      grupo: null
    });
    this.clickCadastro = true;
    this.usuarioLogado = false;
    this.modalAberto = true;
  }


  fecharModal() {
    this.modalAberto = false;
  }



  checkFormErrors(): boolean {
    let valido: boolean = true;
    const controls = this.formCadastroUsuario.controls;

    // Verifica se há erros no campo 'nome'
    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning("O campo nome é obrigatório.");
      valido = false;
    }

    // Verifica se há erros no campo 'email'
    if (controls['email']?.errors) {
      if (controls['email'].errors['required']) {
        this.toastrService.warning("O campo de email é obrigatório.");
      } else if (controls['email'].errors['email']) {
        this.toastrService.warning("O email inserido não é válido.");
      }
      valido = false;
    }

    // Verifica se há erros no campo 'cpf'
    if (controls['cpf']?.errors) {
      if (controls['cpf'].errors['invalidCpf']) {
        this.toastrService.warning("CPF Inválido.");
      } else if (controls['cpf'].errors['required']) {
        this.toastrService.warning("CPF é obrigatório.");
      }
      valido = false;
    }

    // Verifica se há erros no campo 'grupo'
    if (controls['grupo']?.errors?.['required']) {
      this.toastrService.warning("O campo de grupo é obrigatório.");
      valido = false;
    }
    return valido;
  }

  senhaValida(): boolean {
    const controls = this.formCadastroUsuario.controls;

    // Verifica se há erros no campo 'senha'
    if (controls['senha']?.errors?.['required']) {
      this.toastrService.warning("O campo de senha é obrigatório.");
      return false;
    }
    // Verifica se há erros no campo 'confirmarSenha'
    if (controls['confirmarSenha']?.errors?.['required']) {
      this.toastrService.warning("O campo de confirmação de senha é obrigatório.");
      return false;
    }

    if (!controls['senha']?.errors && !controls['confirmarSenha']?.errors) {

      const senha = this.formCadastroUsuario.get('senha').value;
      const confirmarSenha = this.formCadastroUsuario.get('confirmarSenha').value;

      if (senha != confirmarSenha) {
        this.toastrService.warning("Senhas não coincidem.");
        return false;
      }
    }
    return true;
  }
}
