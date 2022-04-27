import { TestBed } from '@angular/core/testing';

import { EwalletLedgerService } from './ewallet-ledger.service';

describe('EwalletLedgerService', () => {
  let service: EwalletLedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EwalletLedgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
