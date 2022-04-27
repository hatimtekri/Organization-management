import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFinalsanctionComponent } from './medical-finalsanction.component';

describe('MedicalFinalsanctionComponent', () => {
  let component: MedicalFinalsanctionComponent;
  let fixture: ComponentFixture<MedicalFinalsanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalFinalsanctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalFinalsanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
