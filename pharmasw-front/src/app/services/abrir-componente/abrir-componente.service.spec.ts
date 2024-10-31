import { TestBed } from '@angular/core/testing';

import { AbrirComponenteService } from './abrir-componente.service';

describe('AbrirComponenteService', () => {
  let service: AbrirComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbrirComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
