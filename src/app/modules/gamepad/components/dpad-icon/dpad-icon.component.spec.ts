import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpadIconComponent } from './dpad-icon.component';

describe('DpadIconComponent', () => {
  let component: DpadIconComponent;
  let fixture: ComponentFixture<DpadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpadIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
