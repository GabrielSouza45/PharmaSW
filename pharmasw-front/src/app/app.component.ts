import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { ModalComponent } from './modal/modal.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BotaoComponent } from "./components/botao/botao.component";
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    PaginaInicialComponent,
    ModalComponent,
    TooltipModule,
    BotaoComponent,
    ModalModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pharmasw-front';
}
