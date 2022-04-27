import { TestBed } from '@angular/core/testing';

import { FacultyMawazeService } from './faculty-mawaze.service';

describe('FacultyMawazeService', () => {
  let service: FacultyMawazeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyMawazeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
