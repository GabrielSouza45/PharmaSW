import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCriadoComponent } from './pedido-criado.component';

describe('PedidoCriadoComponent', () => {
  let component: PedidoCriadoComponent;
  let fixture: ComponentFixture<PedidoCriadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoCriadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
