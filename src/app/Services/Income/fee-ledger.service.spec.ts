import { TestBed } from '@angular/core/testing';

import { FeeLedgerService } from './fee-ledger.service';

describe('FeeLedgerService', () => {
  let service: FeeLedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeLedgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
