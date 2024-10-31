import { Router } from '@angular/router';
import { AuthService } from './../../infra/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private router: Router,
    private auth: AuthService

  ) { }

  checkout(){
    if (this.auth.isAuthenticated){
      this.redireciona();
    } else {
      this.abrirLogin();
    }
  }

  private redireciona(){
  const retornoEndereco = this.abrirPaginaEscolherEndereco();
    const escolherEndereco = this.abrirComponent({}, EscolherEnderecoComponent);
    escolherEndereco.subscribe(

    );
  }

  private abrirPaginaEscolherEndereco(){
    return this.abrirComponent({}, EscolherEnderecoComponent);
  }

  private abrirPaginaEscolherPagamento(){
    return this.abrirComponent({}, EscolherPagamentoComponent);
  }

  private abrirLogin(){
    this.router.navigate(['/entrar'])
  }
}
