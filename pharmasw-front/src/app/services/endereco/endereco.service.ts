import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private url: string = '/endereco'; 

  constructor(private httpClient: HttpClient) {}

  // Método para alterar o endereço padrão enviando o ID do endereço ao backend
  alterarPadrao(idEndereco: number): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${idEndereco}/alterar-padrao`, null);
  }
}
