import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../infra/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  realizaCheckout() {
    if (this.auth.isAuthenticated()) {
      this.redireciona();
    } else {
      this.abrirLogin();
    }
  }

  private redireciona() {
    const hasCheckoutEndereco = this.router.url.includes('/checkout/selecionar-endereco');
    if (hasCheckoutEndereco) {
      this.abrirPaginaPagamento();
    } else {
      this.abrirPaginaEndereco();
    }
  }

  private abrirPaginaEndereco() {
    this.router.navigate(['/checkout/selecionar-endereco'])
  }

  private abrirPaginaPagamento() {
    this.router.navigate(['/checkout/pagamento'])
  }

  private abrirLogin() {
    this.router.navigate(['/checkout/entrar'])
  }
}
