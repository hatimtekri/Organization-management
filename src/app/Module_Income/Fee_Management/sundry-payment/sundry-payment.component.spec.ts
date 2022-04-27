import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SundryPaymentComponent } from './sundry-payment.component';

describe('SundryPaymentComponent', () => {
  let component: SundryPaymentComponent;
  let fixture: ComponentFixture<SundryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SundryPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SundryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
