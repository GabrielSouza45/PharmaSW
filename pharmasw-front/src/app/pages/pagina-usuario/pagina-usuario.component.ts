import { Component } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../modelo/Usuario';
import { Status } from '../../modelo/enums/Status';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagina-usuario',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule
  ],
  templateUrl: './pagina-usuario.component.html',
  styleUrl: './pagina-usuario.component.css'
})
export class PaginaUsuarioComponent {
  usuariosForm!: FormGroup;
  usuarios: any[] = [];

  constructor(private httpClient: HttpClient){
    this.usuariosForm = new FormGroup({
      nomeUsuario: new FormControl(''),
      statusAtivo: new FormControl(false),
      statusInativo: new FormControl(false)
    });


    httpClient.post<any[]>("http://localhost:8080/usuario-controle/listar-todos-usuarios", null)
    .subscribe(data => {
      this.usuarios = data;
      console.log(data);
    });
  }
  onSubmit(){}

  cadastrar(){}
  
}
