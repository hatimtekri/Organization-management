import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBaseitemComponent } from './item-baseitem.component';

describe('ItemBaseitemComponent', () => {
  let component: ItemBaseitemComponent;
  let fixture: ComponentFixture<ItemBaseitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBaseitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBaseitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
