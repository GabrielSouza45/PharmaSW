import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialLayoutComponent } from './pagina-inicial-layout.component';

describe('PaginaInicialLayoutComponent', () => {
  let component: PaginaInicialLayoutComponent;
  let fixture: ComponentFixture<PaginaInicialLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaInicialLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaInicialLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
