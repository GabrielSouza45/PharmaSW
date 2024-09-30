import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginaLayoutComponent } from '../pagina-layout/pagina-layout.component';
import { InputPrimarioComponent } from '../../input-primario/input-primario.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-inicial-layout',
  standalone: true,
  imports: [
    PaginaLayoutComponent,
    InputPrimarioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pagina-inicial-layout.component.html',
  styleUrl: './pagina-inicial-layout.component.css'
})
export class PaginaInicialLayoutComponent{

}
