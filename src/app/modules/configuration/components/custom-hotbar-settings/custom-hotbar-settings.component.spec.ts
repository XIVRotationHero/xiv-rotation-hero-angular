import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHotbarSettingsComponent } from './custom-hotbar-settings.component';

describe('CustomHotbarSettingsComponent', () => {
  let component: CustomHotbarSettingsComponent;
  let fixture: ComponentFixture<CustomHotbarSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomHotbarSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHotbarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
