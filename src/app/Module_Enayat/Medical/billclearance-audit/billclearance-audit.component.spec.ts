import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillclearanceAuditComponent } from './billclearance-audit.component';

describe('BillclearanceAuditComponent', () => {
  let component: BillclearanceAuditComponent;
  let fixture: ComponentFixture<BillclearanceAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillclearanceAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillclearanceAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
