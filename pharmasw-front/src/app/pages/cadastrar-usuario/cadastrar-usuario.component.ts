import { Component } from '@angular/core';
import { CadastrarUsuarioLayoutComponent } from '../../components/cadastrar-usuario-layout/cadastrar-usuario-layout.component';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [
    CadastrarUsuarioLayoutComponent

  ],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {

}
