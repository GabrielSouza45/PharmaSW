import { Component } from '@angular/core';
import { LoginLayoutComponent } from "../../../components/back-office/login-layout/login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../infra/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    CommonModule
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });
  }

  submit(){
    if(!this.loginForm.valid){
      this.checkFormErrors();
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.senha, "login")
      .subscribe({
        next: () => {
          this.toastService.success("Login Realizado com sucesso!");
          document.location.href = '/pagina-inicial';
        },
        error: (erro) => {
          if (erro.status === 403) {
            this.toastService.warning("Usuário não encontrado. Verifique suas credenciais e tente novamente.");
          } else {
            this.toastService.error("Erro inesperado, tente novamente mais tarde.");
          }
        }
      });
  }

  checkFormErrors(): void {
    const controls = this.loginForm.controls;
    if (controls['email'].errors) {
      if (controls['email'].errors['required']) {
        this.toastService.warning("O campo de email é obrigatório.");
      } else if (controls['email'].errors['email']) {
        this.toastService.warning("O email inserido não é válido.");
      }
    } else {
      this.toastService.warning("O campo de senha é obrigatório.");
    }
  }

}
