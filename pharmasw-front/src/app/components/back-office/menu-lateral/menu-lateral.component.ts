import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../infra/auth/auth.service';

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

  grupo: string = '';
  administrador: boolean = false;
  estoquista: boolean = false;
  userLogado: string = this.capitalizarPrimeiraLetra(sessionStorage.getItem('nome') || "Nao Logado");

  constructor(
    public router: Router,
    public authService: AuthService
  ){
    this.grupo = sessionStorage.getItem("grupo");

    if (this.grupo == "ADMINISTRADOR") {
    this.administrador = true;
    }

    if (this.grupo === "ESTOQUISTA") {
      this.estoquista = true;
    }
  }

  capitalizarPrimeiraLetra(input: string): string {
    if (!input) return input;

    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  isActive(route: string): boolean{
    return this.router.url === route;
  }

  logOut(){
    this.authService.logout('/login');
  }

}
