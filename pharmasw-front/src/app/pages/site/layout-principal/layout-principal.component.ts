import { Component, EventEmitter, Output } from '@angular/core';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { BotaoComponent } from '../../../components/botao/botao.component';

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [InputPrimarioComponent, BotaoComponent],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css',
})
export class LayoutPrincipalComponent {
  @Output("event-buscar") buscarNavBar = new EventEmitter();

  buscarProduto() {
    this.buscarNavBar.emit();
  }
}
