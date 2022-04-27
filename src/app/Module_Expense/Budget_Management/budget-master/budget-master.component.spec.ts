import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMasterComponent } from './budget-master.component';

describe('BudgetMasterComponent', () => {
  let component: BudgetMasterComponent;
  let fixture: ComponentFixture<BudgetMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
