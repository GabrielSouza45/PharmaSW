import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaProdutosComponent } from './pagina-produtos.component';

describe('PaginaProdutosComponent', () => {
  let component: PaginaProdutosComponent;
  let fixture: ComponentFixture<PaginaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaProdutosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
