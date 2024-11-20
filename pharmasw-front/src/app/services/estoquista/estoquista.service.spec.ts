import { TestBed } from '@angular/core/testing';

import { EstoquistaService } from './estoquista.service';

describe('EstoquistaService', () => {
  let service: EstoquistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoquistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
