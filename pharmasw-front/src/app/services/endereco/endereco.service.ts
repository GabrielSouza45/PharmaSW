import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../modelo/Endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private apiUrl = 'http://localhost:8080/entrega'; // URL do seu backend

  constructor(private http: HttpClient) { }

  adicionarEndereco(endereco: Endereco): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, endereco, { headers });
  }
}
