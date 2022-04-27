import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalBillentriesStatusComponent } from './medical-billentries-status.component';

describe('MedicalBillentriesStatusComponent', () => {
  let component: MedicalBillentriesStatusComponent;
  let fixture: ComponentFixture<MedicalBillentriesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalBillentriesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalBillentriesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
