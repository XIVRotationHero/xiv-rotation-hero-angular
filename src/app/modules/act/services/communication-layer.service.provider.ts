import {WebsocketCommunicationLayerService} from "./websocket-communication-layer.service";
import {OverlayPluginCommunicationLayerService} from "./overlay-plugin-communication-layer.service";
import {CommunicationLayerService} from "./communication-layer.service";

let communicationLayerServiceFactory = () => {
  const wsUrl = WebsocketCommunicationLayerService.WEBSOCKET_REGEX.exec(location.search)

  if (wsUrl) {
    const service = new WebsocketCommunicationLayerService();
    service.connect(wsUrl[ 1 ]);
    return service;
  } else  if (window.OverlayPluginApi !== undefined) {
    return new OverlayPluginCommunicationLayerService();
  }

  return undefined;
}

export let communicationLayerServiceProvider = {
  provide: CommunicationLayerService,
  useFactory: communicationLayerServiceFactory
};
