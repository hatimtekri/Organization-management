import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectBillComponent } from './approve-reject-bill.component';

describe('ApproveRejectBillComponent', () => {
  let component: ApproveRejectBillComponent;
  let fixture: ComponentFixture<ApproveRejectBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRejectBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
