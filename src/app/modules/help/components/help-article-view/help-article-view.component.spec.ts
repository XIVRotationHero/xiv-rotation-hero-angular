import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpArticleViewComponent } from './help-article-view.component';

describe('HelpArticleViewComponent', () => {
  let component: HelpArticleViewComponent;
  let fixture: ComponentFixture<HelpArticleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpArticleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpArticleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
