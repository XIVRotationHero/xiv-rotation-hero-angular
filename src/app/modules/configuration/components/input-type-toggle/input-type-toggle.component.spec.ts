import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTypeToggleComponent } from './input-type-toggle.component';

describe('InputTypeToggleComponent', () => {
  let component: InputTypeToggleComponent;
  let fixture: ComponentFixture<InputTypeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTypeToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
