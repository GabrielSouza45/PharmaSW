import { Component } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../../components/back-office/pagina-inicial-layout/pagina-inicial-layout.component';
import { PaginaLayoutComponent } from '../../../components/back-office/pagina-layout/pagina-layout.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    PaginaLayoutComponent
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {

}
