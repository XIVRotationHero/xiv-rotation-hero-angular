import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderDialogComponent } from './builder-dialog.component';

describe('BuilderDialogComponent', () => {
  let component: BuilderDialogComponent;
  let fixture: ComponentFixture<BuilderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuilderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
