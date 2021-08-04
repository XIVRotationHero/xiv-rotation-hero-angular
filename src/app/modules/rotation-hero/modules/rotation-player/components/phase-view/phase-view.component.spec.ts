import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseViewComponent } from './phase-view.component';

describe('PhaseViewComponent', () => {
  let component: PhaseViewComponent;
  let fixture: ComponentFixture<PhaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
