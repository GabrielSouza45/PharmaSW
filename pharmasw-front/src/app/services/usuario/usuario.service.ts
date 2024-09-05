import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtros } from '../../modelo/Filtros';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) {  }

  private url: string = "http://localhost:8080/usuario-controle/";

  listar(filtros: Filtros): Observable<any[]> {
    return this.httpClient
    .post<any[]>(this.url + "listar", filtros);
  }

  cadastrar(usuario: Usuario): Observable<HttpResponse<any>> {
    console.log("Cadastro ", usuario);
    return this.httpClient.post<any>(this.url + "cadastrar", usuario, { observe: 'response' });
  }


  editar(usuario: Usuario): Observable<HttpResponse<any>>{
    console.log('CORPOOOO ', usuario);

    return this.httpClient.put<any>(this.url + "editar", usuario, { observe: 'response' });
  }

  mudarStatus(filtros: Filtros): Observable<HttpResponse<any>>{
    return this.httpClient.put<any>(this.url + "mudar-status", filtros, { observe: 'response' });
  }

}
