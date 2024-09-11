import { Injectable } from '@angular/core';
import { Filtros } from '../../modelo/Filtros';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Produto } from '../../modelo/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  mudarStatus(filtros: Filtros): Observable<HttpResponse<any>>{
    return this.httpClient.put<any>(this.url + "mudar-status", filtros, { observe: 'response' });
  }

  constructor(private httpClient: HttpClient) { }

  private url: string = "http://localhost:8080/produto-controle/";

  listar(filtros: Filtros): Observable<any[]> {
    return this.httpClient
    .post<any[]>(this.url + "listar", filtros);
  }

  editar(produto: Produto): Observable<HttpResponse<any>>{
    console.log('CORPOOOO ', produto);

    return this.httpClient.put<any>(this.url + "editar", produto, { observe: 'response' });
  }


  cadastrar(produto: Produto): Observable<HttpResponse<any>> {
    console.log("Cadastro ", produto);
    return this.httpClient.post<any>(this.url + "cadastrar", produto, { observe: 'response' });
  }
}
