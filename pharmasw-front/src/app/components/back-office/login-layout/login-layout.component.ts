import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotaoComponent } from '../../botao/botao.component';
import { PaginaLayoutComponent } from '../pagina-layout/pagina-layout.component';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [
    BotaoComponent,
    PaginaLayoutComponent
  ],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css'
})
export class LoginLayoutComponent {
  @Input() titulo:string = "";
  @Input() textoBtnPrimario:string = "";
  @Output("submit") enviar = new EventEmitter;

  submit(){
    this.enviar.emit();
  }
}
