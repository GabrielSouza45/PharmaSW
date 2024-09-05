import { Component, OnInit } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css'
})
export class PaginaProdutosComponent implements OnInit{

  produtosForm!: FormGroup;
  produtos: any[] = [];

  constructor(private httpClient: HttpClient){
    this.produtosForm = new FormGroup({
      nomeProduto: new FormControl(''),
      statusAtivo: new FormControl(false),
      statusInativo: new FormControl(false)
    });


    httpClient.post<any[]>("http://localhost:8080/produto-controle/listar-produtos", null)
    .subscribe(data => {
      this.produtos = data;
      console.log(data);
    });
  }


  ngOnInit(): void {

  }



  onSubmit() {
    console.log(this.produtosForm.value);

  }

  cadastrar(){

  }
}
