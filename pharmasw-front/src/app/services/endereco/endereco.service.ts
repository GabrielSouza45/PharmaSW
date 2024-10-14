import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../crud-service/crud-service.service';
import { Endereco } from '../../modelo/Endereco';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService extends CrudService<Endereco> {

  private apiUrl = 'http://localhost:8080/entrega';
  
  constructor(private http: HttpClient, private toastr: ToastrService) {
    super(http, '/endereco-controle', toastr);
  }

  // Método para alterar o endereço padrão enviando o ID do endereço ao backend
  alterarPadrao(idEndereco: number): Observable<any> {
    return this.http.put<any>(
      `${this.url}/alterar-padrao/${idEndereco}`,
      null
    );
  }

  adicionarEndereco(endereco: Endereco): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, endereco, { headers });
  }
}
