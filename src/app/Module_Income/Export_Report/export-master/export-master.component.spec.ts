import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMasterComponent } from './export-master.component';

describe('ExportMasterComponent', () => {
  let component: ExportMasterComponent;
  let fixture: ComponentFixture<ExportMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
