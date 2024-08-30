import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroServiceService } from '../../services/cadastro-usuario/cadastro-service.service';
import { ToastrService } from 'ngx-toastr';
import { Grupo } from '../../modelo/enums/Grupo';
import { Usuario } from '../../modelo/Usuario';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    InputPrimarioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {
    cadastroForm!: FormGroup;
    usuario: Usuario;

  constructor(
    private cadastroService: CadastroServiceService,
    private toastService: ToastrService
  ){
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      confirmarSenha: new FormControl('', [Validators.required]),
      cpf : new FormControl('', [Validators.required]),
      grupo : new FormControl('', [Validators.required]),
      nome : new FormControl('', [Validators.required])
    });

  }

  submit(){

    this.usuario.nome = this.cadastroForm.value.nome;
    this.usuario.email = this.cadastroForm.value.email;
    this.usuario.senha = this.cadastroForm.value.senha;
    this.usuario.cpf = this.cadastroForm.value.cpf;

    this.cadastroService.login(this.usuario)
      .subscribe({
        next: () => this.toastService.success("Cadastro Realizado com sucesso!"),
        error: () => this.toastService.error("Erro inesperado, tente novamente mais tarde.")
      })
  }
}
