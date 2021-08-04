import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldownViewComponent } from './cooldown-view.component';

describe('CooldownViewComponent', () => {
  let component: CooldownViewComponent;
  let fixture: ComponentFixture<CooldownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooldownViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooldownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
