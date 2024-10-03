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

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [InputPrimarioComponent, ReactiveFormsModule],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css',
})
export class LayoutPrincipalComponent implements OnInit {
  items: [] = [];
  itemCount: number;
  formBusca: FormGroup;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {
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
        inputPesquisa: null
      });
    }
  }

  ngOnInit() {
    this.carrinhoService.itemCount$.subscribe((count) => {
      this.itemCount = count;
    });
  }

  toCart() {
    this.router.navigate(['/carrinho']);
  }
}
