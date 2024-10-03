import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cep } from '../../modelo/Cep';

@Injectable({
  providedIn: 'root'
})
export class CorreiosApiService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  private url = "http://localHost:8080/home-controle/consultar-cep";

  consultar(cep: string): Observable<Cep> {
    let cepObj =  {
      cep: cep
    };
    return this.http.post<Cep>(this.url, cepObj);
  }
}
