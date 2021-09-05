import { TestBed } from '@angular/core/testing';

import { CrossHotbarService } from './cross-hotbar.service';

describe('CrossHotbarService', () => {
  let service: CrossHotbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossHotbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
