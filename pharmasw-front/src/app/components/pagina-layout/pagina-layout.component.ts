import { Component, Input } from '@angular/core';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-pagina-layout',
  standalone: true,
  imports: [
    MenuLateralComponent
  ],
  templateUrl: './pagina-layout.component.html',
  styleUrl: './pagina-layout.component.css'
})
export class PaginaLayoutComponent {
  @Input() titulo:string = "";
  @Input() classMain: string = "mainTitulo";
}
