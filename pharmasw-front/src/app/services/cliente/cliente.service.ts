import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../crud-service/crud-service.service';
import { Cliente } from '../../modelo/Cliente';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente>{

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    super(http, "/cliente-controle", toastr);
  }

}
