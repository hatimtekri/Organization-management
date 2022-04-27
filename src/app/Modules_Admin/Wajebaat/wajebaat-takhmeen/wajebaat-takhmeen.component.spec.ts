import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WajebaatTakhmeenComponent } from './wajebaat-takhmeen.component';

describe('WajebaatTakhmeenComponent', () => {
  let component: WajebaatTakhmeenComponent;
  let fixture: ComponentFixture<WajebaatTakhmeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WajebaatTakhmeenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WajebaatTakhmeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
