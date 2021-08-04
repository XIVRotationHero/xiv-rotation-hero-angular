import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationSummaryComponent } from './rotation-summary.component';

describe('RotationSummaryComponent', () => {
  let component: RotationSummaryComponent;
  let fixture: ComponentFixture<RotationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
