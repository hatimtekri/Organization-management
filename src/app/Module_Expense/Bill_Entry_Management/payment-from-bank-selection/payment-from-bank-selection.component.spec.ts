import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFromBankSelectionComponent } from './payment-from-bank-selection.component';

describe('PaymentFromBankSelectionComponent', () => {
  let component: PaymentFromBankSelectionComponent;
  let fixture: ComponentFixture<PaymentFromBankSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFromBankSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFromBankSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
