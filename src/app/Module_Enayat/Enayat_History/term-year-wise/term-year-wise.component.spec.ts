import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermYearWiseComponent } from './term-year-wise.component';

describe('TermYearWiseComponent', () => {
  let component: TermYearWiseComponent;
  let fixture: ComponentFixture<TermYearWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermYearWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermYearWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
