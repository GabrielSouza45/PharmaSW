import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteAlterarService {

  private apiUrl = 'http://localhost:8080/cliente-controle/alterar'; // URL para o backend

  constructor(private http: HttpClient) { }

  getClienteLogado(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logado`);
  }

  alterarCliente(clienteData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/alterar`, clienteData);
  }
}
