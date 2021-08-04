import {HotbarStyle} from "../enums/hotbar-style.enum";

export interface HotbarOptions {
  visible: boolean;
  hotbarStyle: HotbarStyle;
  position: [ number, number ];
  scale: number;
}
