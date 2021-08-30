import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HelpArticlesComponent} from './help-articles.component';

describe('HelpOverviewComponent', () => {
  let component: HelpArticlesComponent;
  let fixture: ComponentFixture<HelpArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpArticlesComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
