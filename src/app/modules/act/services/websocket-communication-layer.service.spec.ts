import { TestBed } from '@angular/core/testing';

import { WebsocketCommunicationLayerService } from './websocket-communication-layer.service';

describe('WebsocketCommunicationLayerService', () => {
  let service: WebsocketCommunicationLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketCommunicationLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
