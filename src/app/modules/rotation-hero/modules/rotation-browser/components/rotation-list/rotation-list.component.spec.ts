import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationListComponent } from './rotation-list.component';

describe('RotationListComponent', () => {
  let component: RotationListComponent;
  let fixture: ComponentFixture<RotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
