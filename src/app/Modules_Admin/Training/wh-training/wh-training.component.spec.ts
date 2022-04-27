import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhTrainingComponent } from './wh-training.component';

describe('WhTrainingComponent', () => {
  let component: WhTrainingComponent;
  let fixture: ComponentFixture<WhTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
