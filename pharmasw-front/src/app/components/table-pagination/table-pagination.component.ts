import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Usuario } from './../../modelo/Usuario';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule
  ],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent {
  @Input() dados: any[] = [];
  @Input() acoes: any[] = [];
  colunas: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dados'] && this.dados.length > 0) {
      this.colunas = Object.keys(this.dados[0]);

    }
  }


  // PAGINATION
  totalItems: number = 0;
  currentPage: number = 4;
  page?: number;

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    console.log(this.page);
  }
}
