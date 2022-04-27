import { TestBed } from '@angular/core/testing';

import { FacultySelfinfoService } from './faculty-selfinfo.service';

describe('FacultySelfinfoService', () => {
  let service: FacultySelfinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultySelfinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
