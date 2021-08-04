import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbarSlotComponent } from './hotbar-slot.component';

describe('HotbarSlotComponent', () => {
  let component: HotbarSlotComponent;
  let fixture: ComponentFixture<HotbarSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotbarSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotbarSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
