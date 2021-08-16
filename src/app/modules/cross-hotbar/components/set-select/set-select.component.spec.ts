import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSelectComponent } from './set-select.component';

describe('SetSelectComponent', () => {
  let component: SetSelectComponent;
  let fixture: ComponentFixture<SetSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
