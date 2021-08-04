import { TestBed } from '@angular/core/testing';

import { ActionCostService } from './action-cost.service';

describe('ActionCostService', () => {
  let service: ActionCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
