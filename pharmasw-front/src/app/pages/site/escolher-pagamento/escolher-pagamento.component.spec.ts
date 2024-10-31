import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherPagamentoComponent } from './escolher-pagamento.component';

describe('EscolherPagamentoComponent', () => {
  let component: EscolherPagamentoComponent;
  let fixture: ComponentFixture<EscolherPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolherPagamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EscolherPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
