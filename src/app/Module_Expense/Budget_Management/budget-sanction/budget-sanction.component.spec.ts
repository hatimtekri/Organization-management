import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSanctionComponent } from './budget-sanction.component';

describe('BudgetSanctionComponent', () => {
  let component: BudgetSanctionComponent;
  let fixture: ComponentFixture<BudgetSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetSanctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
