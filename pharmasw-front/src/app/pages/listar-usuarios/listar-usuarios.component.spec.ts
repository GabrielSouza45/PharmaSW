import { ComponentFixture, TestBed } from '@angular/core/testing';

import{UsuarioListagemComponent} from '../listar-usuarios/listar-usuarios.component';

describe('ListarUsuariosComponent', () => {
  let component: UsuarioListagemComponent;
  let fixture: ComponentFixture<UsuarioListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
