import { TestBed } from '@angular/core/testing';

import { ManualOnlineReceiptService } from './manual-online-receipt.service';

describe('ManualOnlineReceiptService', () => {
  let service: ManualOnlineReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualOnlineReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
