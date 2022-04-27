import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SundryReceiptsComponent } from './sundry-receipts.component';

describe('SundryReceiptsComponent', () => {
  let component: SundryReceiptsComponent;
  let fixture: ComponentFixture<SundryReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SundryReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SundryReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
