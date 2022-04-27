import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetArazComponent } from './budget-araz.component';

describe('BudgetArazComponent', () => {
  let component: BudgetArazComponent;
  let fixture: ComponentFixture<BudgetArazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetArazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetArazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
