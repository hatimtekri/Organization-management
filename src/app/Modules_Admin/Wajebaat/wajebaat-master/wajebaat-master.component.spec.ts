import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WajebaatMasterComponent } from './wajebaat-master.component';

describe('WajebaatMasterComponent', () => {
  let component: WajebaatMasterComponent;
  let fixture: ComponentFixture<WajebaatMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WajebaatMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WajebaatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
