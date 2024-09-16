import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

import { Filtros } from '../../modelo/Filtros';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  private domain: string = 'http://localhost:8080';
  private url: string;

  constructor(
    private httpClient: HttpClient,
    @Inject(String) private path: string,
    private toastrServico: ToastrService
  ) {
    this.url = this.domain + path;
  }

  listar(filtros: Filtros, acao: string): Observable<T[]> {
    return this.httpClient.post<any[]>(this.url + acao, filtros);
  }

  adicionar(dados: T | FormData, acao: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url + acao, dados, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const statusCode = response.status;

          if (statusCode === 201) {
            this.toastrServico.success('Registro registrado com sucesso!');
          } else if (statusCode === 401) {
            this.toastrServico.error(
              'Erro na solicitação. Verifique os dados e tente novamente.'
            );
          } else {
            this.toastrServico.warning('Resposta inesperada do servidor.');
          }
        })
      );
  }

  editar(dados: T, acao: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + acao, dados, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const statusCode = response.status;

          if (statusCode === 200) {
            this.toastrServico.success('Registro alterado com sucesso!');
          } else if (statusCode === 400) {
            this.toastrServico.error('Erro na solicitação.');
          } else if (statusCode === 404) {
            this.toastrServico.error('Registro não encontrado.');
          } else {
            this.toastrServico.warning('Resposta inesperada do servidor.');
          }
        })
      );
  }

  editarStatus(filtros: Filtros, acao: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + acao, filtros, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const statusCode = response.status;

          if (statusCode === 200) {
            this.toastrServico.success('Status alterado com sucesso!');
          } else if (statusCode === 400) {
            this.toastrServico.error('Erro na solicitação. Id null.');
          } else if (statusCode === 404) {
            this.toastrServico.error('Registro não encontrado.');
          } else {
            this.toastrServico.warning('Resposta inesperada do servidor.');
          }
        })
      );
  }
}
