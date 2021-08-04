import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationHeroComponent } from './rotation-hero.component';

describe('RotationHeroComponent', () => {
  let component: RotationHeroComponent;
  let fixture: ComponentFixture<RotationHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotationHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
