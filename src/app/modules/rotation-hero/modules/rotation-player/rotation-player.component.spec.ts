import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationPlayerComponent } from './rotation-player.component';

describe('RotationPlayerComponent', () => {
  let component: RotationPlayerComponent;
  let fixture: ComponentFixture<RotationPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
