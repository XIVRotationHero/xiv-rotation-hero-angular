import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbarDisplaySettingsComponent } from './hotbar-display-settings.component';

describe('HotbarDisplaySettingsComponent', () => {
  let component: HotbarDisplaySettingsComponent;
  let fixture: ComponentFixture<HotbarDisplaySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotbarDisplaySettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotbarDisplaySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
