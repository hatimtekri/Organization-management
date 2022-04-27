import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualOnlineReceiptComponent } from './manual-online-receipt.component';

describe('ManualOnlineReceiptComponent', () => {
  let component: ManualOnlineReceiptComponent;
  let fixture: ComponentFixture<ManualOnlineReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualOnlineReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualOnlineReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
