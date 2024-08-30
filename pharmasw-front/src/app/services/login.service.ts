import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario;

  constructor(private httpClient: HttpClient) {  }

  login(email: string, senha: string) {

    this.usuario = new Usuario;
    this.usuario.email = email;
    this.usuario.senha = senha;
   
    return this.httpClient
      .post<LoginResponse>("http://localhost:8080/usuario-controle/login", this.usuario)
      .pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("nome", value.nome)
          sessionStorage.setItem("grupo", value.grupo)
        })
      )
  }
}
