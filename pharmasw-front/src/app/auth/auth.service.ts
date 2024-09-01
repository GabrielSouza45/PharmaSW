import { TreeError } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isUsuarioAutenticado = new BehaviorSubject<boolean>(false);
    private permissaoUsuario = new BehaviorSubject<string | null>(null);

    isAutenticado$ = this.isUsuarioAutenticado.asObservable();
    permissao = this.permissaoUsuario.asObservable();

    constructor(
        private loginService: LoginService,
        private router: Router
    
    ) {
        this.checkAutenticacao();
    }

    login(email: string, senha: string) {
        return this.loginService.login(email, senha).pipe(
            tap(response => {
                console.log('auth login');
                
                this.isUsuarioAutenticado.next(true);
                this.permissaoUsuario.next(response.grupo);
            })
        )
    }

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('nome');
        sessionStorage.removeItem('grupo');
        this.isUsuarioAutenticado.next(false);
        this.permissaoUsuario.next(null);

        this.router.navigate(['/login']);
    }

    checkAutenticacao() {
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

    getUserRole(): string | null {
        return this.permissaoUsuario.value;
    }
}