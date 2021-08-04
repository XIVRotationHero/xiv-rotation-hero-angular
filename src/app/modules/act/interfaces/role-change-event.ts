import {LogLineBaseEvent} from "./log-line-base-event";
import {EventType} from "../enums/event-type";

export interface RoleChangeEvent extends LogLineBaseEvent {
  type: EventType.RoleChangeEvent;
  // timestamp
  classJobId: number;
  strengthValue: number;
  dexterityValue: number;
  vitalityValue: number;
  intelligenceValue: number;
  mindValue: number;
  pietyValue: number
  attackPowerValue: number;
  directHitRateValue: number;
  criticalHitValue: number;
  _unknownValue1: any;
  healingMagicPotencyValue: number;
  determinationValue: number;
  skillSpeedValue: number;
  spellSpeedValue: number;
  _unknownValue2: any;
  tenacityValue: number;
  _unknownValue3: any;
}
