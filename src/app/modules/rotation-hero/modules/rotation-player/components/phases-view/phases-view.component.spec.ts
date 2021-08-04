import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesViewComponent } from './phases-view.component';

describe('PhasesViewComponent', () => {
  let component: PhasesViewComponent;
  let fixture: ComponentFixture<PhasesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
