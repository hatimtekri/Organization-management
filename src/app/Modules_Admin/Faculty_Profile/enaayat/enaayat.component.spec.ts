import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnaayatComponent } from './enaayat.component';

describe('EnaayatComponent', () => {
  let component: EnaayatComponent;
  let fixture: ComponentFixture<EnaayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnaayatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnaayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
