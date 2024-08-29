import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarUsuarioLayoutComponent } from './cadastrar-usuario-layout.component';

describe('CadastrarUsuarioLayoutComponent', () => {
  let component: CadastrarUsuarioLayoutComponent;
  let fixture: ComponentFixture<CadastrarUsuarioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarUsuarioLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarUsuarioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
