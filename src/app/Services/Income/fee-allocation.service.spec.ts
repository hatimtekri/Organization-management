import { TestBed } from '@angular/core/testing';

import { FeeAllocationService } from './fee-allocation.service';

describe('FeeAllocationService', () => {
  let service: FeeAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
