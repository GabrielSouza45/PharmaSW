import { HttpClient } from '@angular/common/http';
import { ImagemProduto } from './../../modelo/ImagemProduto';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Filtros } from '../../modelo/Filtros';

@Injectable({
  providedIn: 'root',
})
export class ImagemService<ImagemProduto> {
  private url: string = 'http://localhost:8080/imagem-produto';

  constructor(
    private httpClient: HttpClient
  ) {}

  listar(filtros: Filtros): Observable<ImagemProduto[]> {
    return this.httpClient.post<any[]>(this.url + '/listar', filtros);
  }
  excluir(imagemProduto: ImagemProduto): Observable<any>{
    return this.httpClient.put<any>(this.url + '/excluir-imagem', imagemProduto);
  }
}
