import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelo/Usuario';
import { Status } from '../../modelo/enums/Status';


@Injectable({
  providedIn: 'root'
})

export class ListarUsuarioModule {
  private apiUrl = 'http://localhost:8080/usuario-controle/listarTodosUsuarios';

  constructor(private http: HttpClient) { }

  filtrarUsuarios(nome: string, statusAtivo: boolean, statusInativo: boolean): Observable<Usuario[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
    if (statusAtivo) {
      params = params.set('statusAtivo', 'true');
    }
    if (statusInativo) {
      params = params.set('statusInativo', 'true');
    }
    return this.http.get<Usuario[]>(`${this.apiUrl}/listarTodosUsuarios`, { params });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  alterarStatus(id: number, novoStatus: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, { status: novoStatus });
  }
}
