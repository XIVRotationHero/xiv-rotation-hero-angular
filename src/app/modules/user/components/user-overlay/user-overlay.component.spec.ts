import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverlayComponent } from './user-overlay.component';

describe('UserOverlayComponent', () => {
  let component: UserOverlayComponent;
  let fixture: ComponentFixture<UserOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
