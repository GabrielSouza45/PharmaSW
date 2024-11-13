import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPedidoComponent } from './detalhes-pedido.component';

describe('DetalhesPedidoComponent', () => {
  let component: DetalhesPedidoComponent;
  let fixture: ComponentFixture<DetalhesPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
