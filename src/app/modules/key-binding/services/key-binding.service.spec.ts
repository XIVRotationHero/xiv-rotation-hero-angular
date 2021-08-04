import { TestBed } from '@angular/core/testing';

import { KeyBindingService } from './key-binding.service';

describe('KeyBindingService', () => {
  let service: KeyBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
