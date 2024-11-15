import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquistaPedidoComponent } from './estoquista-pedido.component';

describe('EstoquistaPedidoComponent', () => {
  let component: EstoquistaPedidoComponent;
  let fixture: ComponentFixture<EstoquistaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoquistaPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstoquistaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
