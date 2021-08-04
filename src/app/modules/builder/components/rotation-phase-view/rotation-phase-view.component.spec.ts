import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationPhaseViewComponent } from './rotation-phase-view.component';

describe('RotationPhaseViewComponent', () => {
  let component: RotationPhaseViewComponent;
  let fixture: ComponentFixture<RotationPhaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationPhaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationPhaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
