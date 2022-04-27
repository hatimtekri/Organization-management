import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalMumbaiauditComponent } from './medical-mumbaiaudit.component';

describe('MedicalMumbaiauditComponent', () => {
  let component: MedicalMumbaiauditComponent;
  let fixture: ComponentFixture<MedicalMumbaiauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalMumbaiauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalMumbaiauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
