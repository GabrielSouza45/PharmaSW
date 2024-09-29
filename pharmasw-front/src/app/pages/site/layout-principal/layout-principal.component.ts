import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CarrinhoService } from '../../../services/carrinho/carrinho.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [InputPrimarioComponent, BotaoComponent],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.css',
})
export class LayoutPrincipalComponent implements OnInit{
  @Output("event-buscar") buscarNavBar = new EventEmitter();
  items: [] = [];
  itemCount: number;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  buscarProduto() {
    this.buscarNavBar.emit();
  }

  ngOnInit() {
    this.carrinhoService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
  }

  toCart(){
    this.router.navigate(["/carrinho"]);
  }
}
