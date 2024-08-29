import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-secundario',
  standalone: true,
  imports: [],
  templateUrl: './botao-secundario.component.html',
  styleUrl: './botao-secundario.component.css'
})
export class BotaoSecundarioComponent {
  @Input() textoBtn:string = "";

}
