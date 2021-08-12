import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepadIconComponent } from './gamepad-icon.component';

describe('GamepadIconComponent', () => {
  let component: GamepadIconComponent;
  let fixture: ComponentFixture<GamepadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamepadIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
