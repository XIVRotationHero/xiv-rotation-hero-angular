import {CrossHotbarControls} from "../../cross-hotbar/enums/cross-hotbar-controls";
import {CrossHotbarDisplayType} from "../../cross-hotbar/enums/cross-hotbar-display-type";

export interface HotbarCrossSettings {
  enableCrossHotbar: boolean;
  alwaysDisplayCrossHotbar: boolean;
  displayHotbarHelp: boolean;
  displayControlGuide: boolean;
  crossHotbarControls: CrossHotbarControls;
  crossHotbarDisplayType: CrossHotbarDisplayType;
  alwaysDisplayWxhb: boolean;
  returnToXhbAfterWxhbInput: boolean;
  positionWxhbSeparatelyFromXhb: boolean;
  wxhbInputTimer: number;
}