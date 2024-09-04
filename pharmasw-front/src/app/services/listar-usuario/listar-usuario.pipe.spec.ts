import { TestBed } from '@angular/core/testing';

import { ListarUsuarioModule } from './listar-usuario.module';

describe('ListarUsuarioPipe', () => {

  let service: ListarUsuarioModule;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarUsuarioModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
