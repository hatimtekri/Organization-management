import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipHistoryComponent } from './scholarship-history.component';

describe('ScholarshipHistoryComponent', () => {
  let component: ScholarshipHistoryComponent;
  let fixture: ComponentFixture<ScholarshipHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
