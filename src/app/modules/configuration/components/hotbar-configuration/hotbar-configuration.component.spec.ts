import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotbarConfigurationComponent } from './hotbar-configuration.component';

describe('HotbarConfigurationComponent', () => {
  let component: HotbarConfigurationComponent;
  let fixture: ComponentFixture<HotbarConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotbarConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotbarConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
