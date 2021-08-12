import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsIconComponent } from './action-buttons-icon.component';

describe('ActionButtonsIconComponent', () => {
  let component: ActionButtonsIconComponent;
  let fixture: ComponentFixture<ActionButtonsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonsIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
