import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComponentType } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../infra/auth/auth.service';
import { CarrinhoService } from '../../services/carrinho/carrinho.service';
import { InputPrimarioComponent } from "../input-primario/input-primario.component";
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  items: [] = [];
  itemCount: number;
  formBusca: FormGroup;
  userLogado: boolean = false;
  userCliente: boolean = false;

  ngOnInit() {
    this.carrinhoService.itemCount$.subscribe((count) => {
      this.itemCount = count;
    });
  }

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userLogado = this.authService.isAuthenticated();
    this.userCliente = this.authService.isCliente();

    this.formBusca = new FormGroup({
      inputPesquisa: new FormControl('', [
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
      ]),
    });
  }

  buscarProduto() {
    if (this.formBusca.valid) {
      const busca = this.formBusca.value.inputPesquisa;
      this.router.navigate(['/home', busca]).then(() => {
        // Força a atualização da rota
        window.location.reload();
      });
    } else {
      this.formBusca.patchValue({
        inputPesquisa: null,
      });
    }
  }

  toCart() {
    this.router.navigate(['/carrinho']);
  }

  toLogin() {
    this.router.navigate(['/entrar']);
  }

  toRegister() {
    this.router.navigate(['/cadastre-se']);
  }

  toPerfil() {
    this.router.navigate(['/minha-conta']);
  }

  toPedidos(){
    this.router.navigate(['/lista-pedidos']);
  }

  logout() {
    const dados = { tituloPopup: 'Deseja realmente sair?' };
    this.abrirComponent(dados, PopupComponent).subscribe((response) => {
      if (response === 'confirmar') {
        this.authService.logout('/entrar');
      }
    });
  }

  private abrirComponent(
    dados: any,
    component: ComponentType<any>
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data: dados,
    });
    // Escutando o resultado após fechar o modal
    return dialogRef.afterClosed();
  }
}
