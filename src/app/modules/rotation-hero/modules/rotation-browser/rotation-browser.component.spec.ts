import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationBrowserComponent } from './rotation-browser.component';

describe('RotationBrowserComponent', () => {
  let component: RotationBrowserComponent;
  let fixture: ComponentFixture<RotationBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
