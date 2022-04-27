import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptVenueComponent } from './dept-venue.component';

describe('DeptVenueComponent', () => {
  let component: DeptVenueComponent;
  let fixture: ComponentFixture<DeptVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptVenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
