import { Component } from '@angular/core';
import { PaginaInicialLayoutComponent } from '../../components/pagina-inicial-layout/pagina-inicial-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputPrimarioComponent } from '../../components/input-primario/input-primario.component';

@Component({
  selector: 'app-pagina-produtos',
  standalone: true,
  imports: [
    PaginaInicialLayoutComponent,
    ReactiveFormsModule,
    InputPrimarioComponent
  ],
  templateUrl: './pagina-produtos.component.html',
  styleUrl: './pagina-produtos.component.css'
})
export class PaginaProdutosComponent {

  produtosForm!: FormGroup;

  constructor(){
    this.produtosForm = new FormGroup({
      nomeProduto: new FormControl(''),
      statusAtivo: new FormControl(false),
      statusInativo: new FormControl(false)
    });
  }

  onSubmit() {
    console.log(this.produtosForm.value);

  }

  cadastrar(){
    
  }
}
