import { Component } from '@angular/core';
import { Grupo } from '../../modelo/enums/Grupo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  administrador: boolean = false;


  grupo: string = sessionStorage.getItem("grupo");
  if (grupo = "ADMINISTRADOR") {
    this.administrador = true;
  }


}
