import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhidmatGuzaarComponent } from './khidmat-guzaar.component';

describe('KhidmatGuzaarComponent', () => {
  let component: KhidmatGuzaarComponent;
  let fixture: ComponentFixture<KhidmatGuzaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhidmatGuzaarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhidmatGuzaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
