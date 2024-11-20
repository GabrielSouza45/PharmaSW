import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../../modelo/Pedido';
import { CrudService } from '../crud-service/crud-service.service';

@Injectable({
  providedIn: 'root'
})
export class EstoquistaService extends CrudService<Pedido> {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    super(http, '/pedido-estoquista-controle', toastr);
  }

  listarTodos(): Observable<Pedido[]> {
    return this.listarGet('/listar-todos');
  }

  // Método para atualizar o status de um pedido
  atualizarStatusPedido(idPedido: number, novoStatus: string): Observable<any> {
    const url = `${this.url}/atualizar-status?idPedido=${idPedido}&novoStatus=${novoStatus}`;
    return this.http.patch(url, {}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
