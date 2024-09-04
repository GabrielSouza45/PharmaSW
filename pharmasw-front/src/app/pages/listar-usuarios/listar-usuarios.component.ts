import { Component, OnInit } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';
import { TablePaginationComponent } from '../../components/table-pagination/table-pagination.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListarUsuarioModule } from '../../services/listar-usuario/listar-usuario.module';
import { Usuario} from '../../modelo/Usuario'
import { Status } from '../../modelo/enums/Status';

@Component({
  selector: 'app-pagina-listar-usuario',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent,
    TablePaginationComponent,
    CommonModule
  ],
  templateUrl: '../listar-usuarios/listar-usuarios.component.html',
  styleUrl: '../listar-usuarios/listar-usuarios.component.css'
})
export class UsuarioListagemComponent implements OnInit {
  listarUsuarioForm: FormGroup;
  usuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private listarUsuario: ListarUsuarioModule
  ) {}

  ngOnInit() {
    this.listarUsuarioForm = this.fb.group({
      nomeUsuario: [''],
      statusAtivo: [true],
      statusInativo: [false]
    });

    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.listarUsuario.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  onSubmit() {
    const filters = this.listarUsuarioForm.value;
    this.listarUsuario
      .filtrarUsuarios(filters.nomeUsuario, filters.statusAtivo, filters.statusInativo)
      .subscribe((data: any[]) => {
        this.usuarios = data;
        console.log('Usuários filtrados:', this.usuarios);
      });
  }

  toggleStatus(usuario: Usuario) {
    const novoStatus = usuario.status === Status.INACTIVE ? Status.ACTIVE : Status.INACTIVE;

    this.listarUsuario.alterarStatus(usuario.id, novoStatus).subscribe(
      () => {
        usuario.status = novoStatus;
      },
      (error) => {
        console.error('Erro ao alterar status do usuário:', error);
      }
    );
  }
}
