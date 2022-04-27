import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MawazeComponent } from './mawaze.component';

describe('MawazeComponent', () => {
  let component: MawazeComponent;
  let fixture: ComponentFixture<MawazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MawazeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MawazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
