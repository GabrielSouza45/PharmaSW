import { Component, Input } from '@angular/core';
import { BotaoComponent } from '../botao/botao.component';
import { BotaoSecundarioComponent } from '../botao-secundario/botao-secundario.component';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [
    BotaoComponent,
    BotaoSecundarioComponent  
  ],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.css'
})
export class LoginLayoutComponent {
  @Input() titulo:string = "";
  @Input() textoBtnPrimario:string = "";
  @Input() textoBtnSecundario:string = "";

}
