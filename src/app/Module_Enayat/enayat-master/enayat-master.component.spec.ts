import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnayatMasterComponent } from './enayat-master.component';

describe('EnayatMasterComponent', () => {
  let component: EnayatMasterComponent;
  let fixture: ComponentFixture<EnayatMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnayatMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnayatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
