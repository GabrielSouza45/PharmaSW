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
    const hasCheckoutPagamento = this.router.url.includes('/checkout/pagamento');

    if (hasCheckoutEndereco) {
      this.abrirPaginaPagamento();
    } else if (hasCheckoutPagamento) {
      this.finalizaCheckout();
    } else {
      this.abrirPaginaEndereco();
    }
  }

  private abrirPaginaEndereco() {
    this.router.navigate(['/checkout/selecionar-endereco']);
  }

  private abrirPaginaPagamento() {
    this.router.navigate(['/checkout/pagamento']);
  }

  private finalizaCheckout() {
    this.router.navigate(['/resumo-pedido']);
  }

  private abrirLogin() {
    this.router.navigate(['/checkout/entrar']);
  }
}
