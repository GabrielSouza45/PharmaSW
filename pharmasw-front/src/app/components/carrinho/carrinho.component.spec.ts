import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoComponent } from './carrinho.component';
import { ToastrService } from 'ngx-toastr';

describe('CarrinhoComponent', () => {
  let component: CarrinhoComponent;
  let fixture: ComponentFixture<CarrinhoComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['warning']);

    await TestBed.configureTestingModule({
      declarations: [CarrinhoComponent],
      providers: [{ provide: ToastrService, useValue: toastrSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate subtotal correctly', () => {
    component.carrinho = [
      { id: 1, nome: 'Produto A', preco: 100, quantidade: 2, frete: 10 },
      { id: 2, nome: 'Produto B', preco: 50, quantidade: 1, frete: 5 }
    ];
    component.recalcularSubtotal();
    expect(component.subtotal).toEqual(315); // 100*2 + 50*1 + 10 + 5
  });

  it('should decrease product quantity', () => {
    const produto = { id: 1, nome: 'Produto A', preco: 100, quantidade: 2, frete: 10 };
    component.diminuirQuantidade(produto);
    expect(produto.quantidade).toEqual(1);
  });

  it('should show a warning if quantity is 1 and trying to decrease', () => {
    const produto = { id: 1, nome: 'Produto A', preco: 100, quantidade: 1, frete: 10 };
    component.diminuirQuantidade(produto);
    expect(toastrService.warning).toHaveBeenCalledWith('A quantidade mínima é 1');
  });
});
