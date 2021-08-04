import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBindingDialogComponent } from './key-binding-dialog.component';

describe('KeyBindingDialogComponent', () => {
  let component: KeyBindingDialogComponent;
  let fixture: ComponentFixture<KeyBindingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyBindingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyBindingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
