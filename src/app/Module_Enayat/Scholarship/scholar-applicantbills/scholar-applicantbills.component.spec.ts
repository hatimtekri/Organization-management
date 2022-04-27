import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarApplicantbillsComponent } from './scholar-applicantbills.component';

describe('ScholarApplicantbillsComponent', () => {
  let component: ScholarApplicantbillsComponent;
  let fixture: ComponentFixture<ScholarApplicantbillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarApplicantbillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarApplicantbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
