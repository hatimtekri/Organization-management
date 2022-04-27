import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobepaidBillsComponent } from './tobepaid-bills.component';

describe('TobepaidBillsComponent', () => {
  let component: TobepaidBillsComponent;
  let fixture: ComponentFixture<TobepaidBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TobepaidBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TobepaidBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
