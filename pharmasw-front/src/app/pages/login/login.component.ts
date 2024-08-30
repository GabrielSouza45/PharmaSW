import { Component } from '@angular/core';
import { LoginLayoutComponent } from "../../components/login-layout/login-layout.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginLayoutComponent, 
    ReactiveFormsModule,
    InputPrimarioComponent
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
    private toastService: ToastrService,
    private router: Router
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });

  }

  submit(){
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
}
