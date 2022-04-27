import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeStudentComponent } from './exclude-student.component';

describe('ExcludeStudentComponent', () => {
  let component: ExcludeStudentComponent;
  let fixture: ComponentFixture<ExcludeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcludeStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
