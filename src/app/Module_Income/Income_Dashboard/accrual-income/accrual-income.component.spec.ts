import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccrualIncomeComponent } from './accrual-income.component';

describe('AccrualIncomeComponent', () => {
  let component: AccrualIncomeComponent;
  let fixture: ComponentFixture<AccrualIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccrualIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccrualIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
