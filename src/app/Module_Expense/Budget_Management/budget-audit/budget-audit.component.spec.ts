import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAuditComponent } from './budget-audit.component';

describe('BudgetAuditComponent', () => {
  let component: BudgetAuditComponent;
  let fixture: ComponentFixture<BudgetAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
