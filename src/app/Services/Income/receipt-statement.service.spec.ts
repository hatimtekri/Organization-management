import { TestBed } from '@angular/core/testing';

import { ReceiptStatementService } from './receipt-statement.service';

describe('ReceiptStatementService', () => {
  let service: ReceiptStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
