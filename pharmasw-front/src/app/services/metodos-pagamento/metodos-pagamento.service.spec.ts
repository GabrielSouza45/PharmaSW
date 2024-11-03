import { TestBed } from '@angular/core/testing';

import { MetodosPagamentoService } from '../metodos-pagamento.service';

describe('MetodosPagamentoService', () => {
  let service: MetodosPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodosPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
