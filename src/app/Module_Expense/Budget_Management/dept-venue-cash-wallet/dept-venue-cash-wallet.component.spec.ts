import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptVenueCashWalletComponent } from './dept-venue-cash-wallet.component';

describe('DeptVenueCashWalletComponent', () => {
  let component: DeptVenueCashWalletComponent;
  let fixture: ComponentFixture<DeptVenueCashWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptVenueCashWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptVenueCashWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
