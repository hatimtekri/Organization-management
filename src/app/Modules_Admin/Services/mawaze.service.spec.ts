import { TestBed } from '@angular/core/testing';

import { MawazeService } from './mawaze.service';

describe('MawazeService', () => {
  let service: MawazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MawazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
