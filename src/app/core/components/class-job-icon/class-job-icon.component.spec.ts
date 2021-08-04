import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassJobIconComponent } from './class-job-icon.component';

describe('ClassJobIconComponent', () => {
  let component: ClassJobIconComponent;
  let fixture: ComponentFixture<ClassJobIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassJobIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassJobIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
