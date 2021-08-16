import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossHotbarComponent } from './cross-hotbar.component';

describe('CrossHotbarComponent', () => {
  let component: CrossHotbarComponent;
  let fixture: ComponentFixture<CrossHotbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossHotbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossHotbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
