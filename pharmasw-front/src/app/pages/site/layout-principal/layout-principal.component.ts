import { AuthService } from './../../../infra/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../../components/popup/popup.component';
import { Observable } from 'rxjs';
import { ComponentType } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
    PopupComponent,
  ],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css',
})
export class LayoutPrincipalComponent implements OnInit {
  items: [] = [];
  itemCount: number;
  formBusca: FormGroup;
  userLogado: boolean = false;

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
