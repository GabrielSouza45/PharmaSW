import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUsuarioAutenticado = new BehaviorSubject<boolean>(false);
  private permissaoUsuario = new BehaviorSubject<string | null>(null);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.checkAutenticacao();
  }

  login(email: string, senha: string, url: string) {
    sessionStorage.clear();
    return this.loginService.login(email, senha, url).pipe(
      tap((response) => {
        this.isUsuarioAutenticado.next(true);
        this.permissaoUsuario.next(response.grupo);
      })
    );
  }

  logout(rota: string) {
    sessionStorage.clear();
    this.isUsuarioAutenticado.next(false);
    this.permissaoUsuario.next(null);
    this.ngZone.run(() => {
      this.router.navigate([rota]);
    });
  }

  private checkAutenticacao() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isUsuarioAutenticado.next(true);
      this.permissaoUsuario.next(sessionStorage.getItem('grupo') || null);
    } else {
      this.isUsuarioAutenticado.next(false);
    }
  }

  isAuthenticated(): boolean {
    return this.isUsuarioAutenticado.value;
  }

  getUserNome(){
    return sessionStorage.getItem('nome');
  }

  getUserRole(): string | null {
    return this.permissaoUsuario.value;
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getIdUser(): number{
    return Number(sessionStorage.getItem('id'));
  }
}
