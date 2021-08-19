import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthProviderUserBadgeComponent } from './oauth-provider-user-badge.component';

describe('OauthProviderUserBadgeComponent', () => {
  let component: OauthProviderUserBadgeComponent;
  let fixture: ComponentFixture<OauthProviderUserBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthProviderUserBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthProviderUserBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
