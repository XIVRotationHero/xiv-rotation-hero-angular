import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossHotbarSetComponent } from './cross-hotbar-set.component';

describe('CrossHotbarSetComponent', () => {
  let component: CrossHotbarSetComponent;
  let fixture: ComponentFixture<CrossHotbarSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossHotbarSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossHotbarSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
