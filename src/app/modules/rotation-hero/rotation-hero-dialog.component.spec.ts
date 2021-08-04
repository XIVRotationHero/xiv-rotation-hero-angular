import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationHeroDialogComponent } from './rotation-hero-dialog.component';

describe('RotationHeroDialogComponent', () => {
  let component: RotationHeroDialogComponent;
  let fixture: ComponentFixture<RotationHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationHeroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
