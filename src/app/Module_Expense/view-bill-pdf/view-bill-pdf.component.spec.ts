import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillPdfComponent } from './view-bill-pdf.component';

describe('ViewBillPdfComponent', () => {
  let component: ViewBillPdfComponent;
  let fixture: ComponentFixture<ViewBillPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBillPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
