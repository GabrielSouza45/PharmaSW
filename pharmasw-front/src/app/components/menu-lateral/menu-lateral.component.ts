import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  constructor(
    public router: Router,
    public authService: AuthService
  ){
    sessionStorage.setItem('nomeUsuarioLogado', 'John Doe');
  }
  

  administrador: boolean = false;
  userLogado: string = sessionStorage.getItem('nomeUsuarioLogado');

  grupo: string = sessionStorage.getItem("grupo");
  if (grupo = "ADMINISTRADOR") {
    this.administrador = true;
  }

  isActive(route: string): boolean{
    return this.router.url === route;
  }

  logOut(){
    this.authService.logout();
  }

}
