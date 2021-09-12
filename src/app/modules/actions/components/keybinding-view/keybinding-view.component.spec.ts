import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybindingViewComponent } from './keybinding-view.component';

describe('KeybindingViewComponent', () => {
  let component: KeybindingViewComponent;
  let fixture: ComponentFixture<KeybindingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeybindingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeybindingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
