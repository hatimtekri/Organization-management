import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantbillsComponent } from './applicantbills.component';

describe('ApplicantbillsComponent', () => {
  let component: ApplicantbillsComponent;
  let fixture: ComponentFixture<ApplicantbillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantbillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
