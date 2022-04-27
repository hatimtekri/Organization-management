import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarBillclearanceAuditComponent } from './scholar-billclearance-audit.component';

describe('ScholarBillclearanceAuditComponent', () => {
  let component: ScholarBillclearanceAuditComponent;
  let fixture: ComponentFixture<ScholarBillclearanceAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarBillclearanceAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarBillclearanceAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
