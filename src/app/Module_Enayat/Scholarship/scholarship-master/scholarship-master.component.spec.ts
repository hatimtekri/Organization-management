import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipMasterComponent } from './scholarship-master.component';

describe('ScholarshipMasterComponent', () => {
  let component: ScholarshipMasterComponent;
  let fixture: ComponentFixture<ScholarshipMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
