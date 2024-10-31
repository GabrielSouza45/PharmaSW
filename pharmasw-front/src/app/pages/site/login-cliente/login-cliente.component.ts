import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { PopupComponent } from "../../../components/popup/popup.component";
import { AuthService } from '../../../infra/auth/auth.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
    BotaoComponent,
    PopupComponent
  ],
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.css',
})
export class LoginClienteComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      this.checkFormErrors();
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.senha, "login-site")
      .subscribe({
        next: () => {
          this.toastService.success("Login Realizado com sucesso!");
          this.redirecionaUsuario();
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

  private redirecionaUsuario() {
    const hasCheckout = this.router.url.includes('/checkout');
    if (hasCheckout) {
      this.toastService.success('Login checkout');
      this.checkoutService.realizaCheckout(); // Realiza Chekout novamente e garante o segmento de etapas do checkout
    } else {
      this.router.navigate(['/']); // Redireciona para a pagina home
    }
  }

  private checkFormErrors(): void {
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
