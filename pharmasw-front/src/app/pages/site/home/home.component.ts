import { CrudService } from './../../../services/crud-service/crud-service.service';
import { Component } from '@angular/core';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { Produto } from '../../../modelo/Produto';
import { Filtros } from '../../../modelo/Filtros';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  produtos: Produto[] = [];
  private crudService: CrudService<Produto>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.crudService= new CrudService(http, "/produto-controle", toastr)
  }

  ngOnInit(): void {
    // this.loadProdutos();
  }

  loadProdutos(): void {
    this.crudService.listar(new Filtros, "listar").subscribe(data => {
      this.produtos = data;
    });
  }
}
