import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Filtros } from '../modelo/Filtros';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  private domain: string = "http://localhost:8080";
  private url: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(String) private path: string
  ){
    this.url = this.domain + path;
   }


  listar(filtros: Filtros, acao: string): Observable<T[]> {
    return this.httpClient
    .post<any[]>(this.url + acao, filtros);
  }

  adicionar(dados: T, acao: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.url + acao, dados, { observe: 'response' });
  }


  editar(dados: T, acao: string): Observable<HttpResponse<any>>{
    return this.httpClient.put<any>(this.url + acao, dados, { observe: 'response' });
  }

  editarStatus(filtros: Filtros, acao: string): Observable<HttpResponse<any>>{
    return this.httpClient.put<any>(this.url + acao, filtros, { observe: 'response' });
  }

}
