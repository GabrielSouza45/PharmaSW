import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

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

  @Input() dados: any[] = [];
  colunas: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dados'] && this.dados.length > 0) {
      this.colunas = Object.keys(this.dados[0]);
    }
  }
}
