import { TestBed } from '@angular/core/testing';

import { OverlayPluginCommunicationLayerService } from './overlay-plugin-communication-layer.service';

describe('OverlayPluginCommunicationLayerService', () => {
  let service: OverlayPluginCommunicationLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayPluginCommunicationLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
