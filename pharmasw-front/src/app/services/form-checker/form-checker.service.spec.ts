import { TestBed } from '@angular/core/testing';

import { FormCheckerService } from './form-checker.service';

describe('FormCheckerService', () => {
  let service: FormCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
