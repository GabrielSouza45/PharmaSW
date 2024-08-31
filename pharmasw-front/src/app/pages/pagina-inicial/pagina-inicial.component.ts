import { Component } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    MenuLateralComponent
  ],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {

}
