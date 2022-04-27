import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalMasterComponent } from './medical-master.component';

describe('MedicalMasterComponent', () => {
  let component: MedicalMasterComponent;
  let fixture: ComponentFixture<MedicalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
