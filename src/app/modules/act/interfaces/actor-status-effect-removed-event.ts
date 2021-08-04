import {LogLineBaseEvent} from "./log-line-base-event";

interface ActorStatusEffectRemovedEvent extends LogLineBaseEvent {
  type: '30';
  // timestamp
  statusEffectId: number;
  statusEffectName: string;
  remainingTime: number;
  effectSourceId: string;
  effectSource: string;
  effectTargetId: string;
  effectTargetName: string;
  _unknownValue1: any;
  _unknownValue2: any;
  _unknownValue3: any;
  _unknownValue4: any;
}
