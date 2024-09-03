import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.css'
})
export class TablePaginationComponent implements OnInit{

  @Input() dados: any[] = [];
  colunas: string[] = [];

  ngOnInit() {
      console.log('Tabela, dados -> ', this.dados);
      if (this.dados.length > 0) {
      // Extrai os nomes das colunas com base no primeiro objeto recebido
      this.colunas = Object.keys(this.dados[0]);

    }
  }
}
