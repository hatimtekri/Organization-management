import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeMasterComponent } from './income-master.component';

describe('IncomeMasterComponent', () => {
  let component: IncomeMasterComponent;
  let fixture: ComponentFixture<IncomeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
