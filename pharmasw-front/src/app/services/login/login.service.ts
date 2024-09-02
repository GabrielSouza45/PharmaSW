import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/Usuario';
import { LoginResponse } from '../../types/login-response.type';
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
      .post<LoginResponse>("http://localhost:8080/auth/login", this.usuario)
      .pipe(
        tap((value) => {

          console.log('Login login');

          sessionStorage.setItem("token", value.token)
          sessionStorage.setItem("nome", value.nome)
          sessionStorage.setItem("grupo", value.grupo)

          console.log("token", value.token);
          console.log("nome", value.nome);
          console.log("grupo", value.grupo);

        })
      )
  }
}
