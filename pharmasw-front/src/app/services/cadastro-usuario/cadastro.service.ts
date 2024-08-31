import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/Usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  constructor(private httpClient : HttpClient) { }

  login(usuario: Usuario) {

    return this.httpClient
      .post("http://localhost:8080/usuario-controle/cadastrar", usuario)

  }
}
