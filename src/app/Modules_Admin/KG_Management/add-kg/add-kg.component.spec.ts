import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKgComponent } from './add-kg.component';

describe('AddKgComponent', () => {
  let component: AddKgComponent;
  let fixture: ComponentFixture<AddKgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
