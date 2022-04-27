import { TestBed } from '@angular/core/testing';

import { FacultyProfileService } from './faculty-profile.service';

describe('FacultyProfileService', () => {
  let service: FacultyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
