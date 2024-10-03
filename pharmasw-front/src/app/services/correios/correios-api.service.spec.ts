import { TestBed } from '@angular/core/testing';

import { CorreiosApiService } from './correios-api.service';

describe('CorreiosApiService', () => {
  let service: CorreiosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreiosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
