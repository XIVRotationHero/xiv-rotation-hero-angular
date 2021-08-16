import {HotbarSideSet} from "../../hotbars/types/hotbar-side-set";
import {WxhbInputType} from "../../cross-hotbar/enums/wxhb-input-type";

export interface HotbarCustomSettings {
  enableExpandedControls: boolean;
  displayWithLtRt: HotbarSideSet;
  displayWithRtLt: HotbarSideSet;
  enableWxhbWithDoubleTap: boolean;
  wxhbInputType: WxhbInputType;
  displayWithDoubleLt: HotbarSideSet;
  displayWithDoubleRt: HotbarSideSet;
}
