import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassJobSelectionComponent } from './class-job-selection.component';

describe('JobSelectionComponent', () => {
  let component: ClassJobSelectionComponent;
  let fixture: ComponentFixture<ClassJobSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassJobSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassJobSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
