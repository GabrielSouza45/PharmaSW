import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/Usuario';
import { LoginResponse } from '../../types/login-response.type';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuario: Usuario;

  constructor(private httpClient: HttpClient) {  }

  login(email: string, senha: string): Observable<LoginResponse> {

    this.usuario = new Usuario(
      null,
      email,
      senha,
      null,
      null
    );

    return this.httpClient
      .post<LoginResponse>("http://localhost:8080/auth/login", this.usuario)
      .pipe(
        tap((value) => {
          sessionStorage.setItem("token", value.token);
          sessionStorage.setItem("nome", value.nome);
          sessionStorage.setItem("id", value.id.toString());
          sessionStorage.setItem("grupo", value.grupo);
        })
      )
  }
}
