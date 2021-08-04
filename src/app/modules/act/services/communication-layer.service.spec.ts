import { TestBed } from '@angular/core/testing';

import { CommunicationLayerService } from './communication-layer.service';

describe('CommunicationLayerService', () => {
  let service: CommunicationLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicationLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
