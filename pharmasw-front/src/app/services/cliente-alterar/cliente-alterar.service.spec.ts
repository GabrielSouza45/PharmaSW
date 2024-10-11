import { TestBed } from '@angular/core/testing';

import { ClienteAlterarService } from './cliente-alterar.service';

describe('ClienteAlterarService', () => {
  let service: ClienteAlterarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteAlterarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
