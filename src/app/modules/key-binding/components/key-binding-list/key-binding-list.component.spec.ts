import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyBindingListComponent } from './key-binding-list.component';

describe('KeyBindingListComponent', () => {
  let component: KeyBindingListComponent;
  let fixture: ComponentFixture<KeyBindingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyBindingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyBindingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
