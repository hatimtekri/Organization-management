import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDashboardMasterComponent } from './income-dashboard-master.component';

describe('IncomeDashboardMasterComponent', () => {
  let component: IncomeDashboardMasterComponent;
  let fixture: ComponentFixture<IncomeDashboardMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDashboardMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDashboardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
