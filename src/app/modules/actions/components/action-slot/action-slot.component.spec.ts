import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSlotComponent } from './action-slot.component';

describe('ActionSlotComponent', () => {
  let component: ActionSlotComponent;
  let fixture: ComponentFixture<ActionSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
