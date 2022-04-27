import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillManagementMasterComponent } from './bill-management-master.component';

describe('BillManagementMasterComponent', () => {
  let component: BillManagementMasterComponent;
  let fixture: ComponentFixture<BillManagementMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillManagementMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillManagementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
