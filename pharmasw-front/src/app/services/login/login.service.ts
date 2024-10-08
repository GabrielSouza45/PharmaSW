import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Login } from '../../modelo/Login';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginObj: Login;

  constructor(private httpClient: HttpClient) {  }

  login(email: string, senha: string, url: string): Observable<LoginResponse> {

    this.loginObj = new Login(
      email,
      senha
    );

    return this.httpClient
      .post<LoginResponse>("http://localhost:8080/auth/"+url, this.loginObj)
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
