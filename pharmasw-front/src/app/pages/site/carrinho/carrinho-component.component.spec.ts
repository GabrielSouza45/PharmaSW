import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoComponentComponent } from './carrinho-component.component';

describe('CarrinhoComponentComponent', () => {
  let component: CarrinhoComponentComponent;
  let fixture: ComponentFixture<CarrinhoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrinhoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
