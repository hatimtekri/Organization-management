import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarBillentriesStatusComponent } from './scholar-billentries-status.component';

describe('ScholarBillentriesStatusComponent', () => {
  let component: ScholarBillentriesStatusComponent;
  let fixture: ComponentFixture<ScholarBillentriesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarBillentriesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarBillentriesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
