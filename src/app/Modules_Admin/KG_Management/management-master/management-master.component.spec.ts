import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementMasterComponent } from './management-master.component';

describe('ManagementMasterComponent', () => {
  let component: ManagementMasterComponent;
  let fixture: ComponentFixture<ManagementMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
