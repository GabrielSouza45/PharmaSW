import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Usuario } from './../../modelo/Usuario';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent {
  @Output("alterarEstadoCadastro") alterar = new EventEmitter<{item: Usuario}>;
  @Output("alterarEstadoStatus") mudarStatus = new EventEmitter<{id: number}>;
  @Input() dados: any[] = [];
  colunas: string[] = [];
  idLogado: string = sessionStorage.getItem("id");


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dados'] && this.dados.length > 0) {
      this.colunas = Object.keys(this.dados[0]);

    }
  }

  alterarCadastro(item: any){
    this.alterar.emit({item});
  }

  alterarStatus(id: number){
    this.mudarStatus.emit({id});
  }
}
