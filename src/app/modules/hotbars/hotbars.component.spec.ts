import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbarsComponent } from './hotbars.component';

describe('HotbarsComponent', () => {
  let component: HotbarsComponent;
  let fixture: ComponentFixture<HotbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotbarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
