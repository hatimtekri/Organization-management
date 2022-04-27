import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarMumbaiauditComponent } from './scholar-mumbaiaudit.component';

describe('ScholarMumbaiauditComponent', () => {
  let component: ScholarMumbaiauditComponent;
  let fixture: ComponentFixture<ScholarMumbaiauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarMumbaiauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarMumbaiauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
