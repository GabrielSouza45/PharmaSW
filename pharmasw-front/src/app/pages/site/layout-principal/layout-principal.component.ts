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
import { NavBarComponent } from "../../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
    PopupComponent,
    NavBarComponent
],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css',
})
export class LayoutPrincipalComponent {
}
