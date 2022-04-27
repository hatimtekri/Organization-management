import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarFinalsanctionComponent } from './scholar-finalsanction.component';

describe('ScholarFinalsanctionComponent', () => {
  let component: ScholarFinalsanctionComponent;
  let fixture: ComponentFixture<ScholarFinalsanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarFinalsanctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarFinalsanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
