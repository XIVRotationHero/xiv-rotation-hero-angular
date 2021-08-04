import {LogLineBaseEvent} from "./log-line-base-event";
import {EventType} from "../enums/event-type";

export interface ActionEvent extends LogLineBaseEvent {
  type: EventType.ActionEvent;
  // timestamp
  playerId: string;
  playerName: string;
  attackId: number;
  attackName: string;
  attackTarget: string;
  attackTargetName: string;
  castDuration: number;
}
