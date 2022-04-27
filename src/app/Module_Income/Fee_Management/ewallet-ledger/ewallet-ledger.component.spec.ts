import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EwalletLedgerComponent } from './ewallet-ledger.component';

describe('EwalletLedgerComponent', () => {
  let component: EwalletLedgerComponent;
  let fixture: ComponentFixture<EwalletLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EwalletLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EwalletLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
