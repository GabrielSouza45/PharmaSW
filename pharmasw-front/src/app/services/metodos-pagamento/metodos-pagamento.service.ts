import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosPagamento } from '../../modelo/MetodosPagamento';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud-service/crud-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MetodosPagamentoService extends CrudService<MetodosPagamento>{
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    super(http, "/metodos-pagamento", toastr)
  }

  setMetodoSelecionado(metodo: MetodosPagamento){
    sessionStorage.setItem('metodosPagamentoSelecionado', JSON.stringify(metodo));
  }

  getMetodoSelecionado(): MetodosPagamento{
    return JSON.parse(sessionStorage.getItem('metodosPagamentoSelecionado'));
  }

}
