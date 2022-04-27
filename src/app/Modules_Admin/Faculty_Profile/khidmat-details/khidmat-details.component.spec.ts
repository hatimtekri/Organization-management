import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhidmatDetailsComponent } from './khidmat-details.component';

describe('KhidmatDetailsComponent', () => {
  let component: KhidmatDetailsComponent;
  let fixture: ComponentFixture<KhidmatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhidmatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhidmatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
