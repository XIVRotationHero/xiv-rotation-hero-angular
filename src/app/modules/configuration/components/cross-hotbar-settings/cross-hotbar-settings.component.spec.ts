import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossHotbarSettingsComponent } from './cross-hotbar-settings.component';

describe('CrossHotbarSettingsComponent', () => {
  let component: CrossHotbarSettingsComponent;
  let fixture: ComponentFixture<CrossHotbarSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossHotbarSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossHotbarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
