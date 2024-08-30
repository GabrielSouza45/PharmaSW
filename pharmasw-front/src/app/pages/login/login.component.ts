import { Component } from '@angular/core';
import { LoginLayoutComponent } from "../../components/login-layout/login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { LoginService } from '../../services/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent, 
    ReactiveFormsModule,
    InputPrimarioComponent,
    CommonModule,
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastrService
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

    this.loginService.login(this.loginForm.value.email, this.loginForm.value.senha)
      .subscribe({
        next: () => {
          this.toastService.success("Login Realizado com sucesso!");
          this.router.navigate(["pagina-inicial"]);
        },
        error: (erro) => {
          if (erro.status === 404) {
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
