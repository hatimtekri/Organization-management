import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportExcelComponent } from './export-report-excel.component';

describe('ExportReportExcelComponent', () => {
  let component: ExportReportExcelComponent;
  let fixture: ComponentFixture<ExportReportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportReportExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportReportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
