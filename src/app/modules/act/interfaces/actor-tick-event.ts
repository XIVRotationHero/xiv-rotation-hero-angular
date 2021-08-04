import {LogLineBaseEvent} from "./log-line-base-event";
import {EventType} from "../enums/event-type";

interface ActorTickEvent extends LogLineBaseEvent {
  type: EventType.ActorTickEvent;
  // timestamp
  playerId: string;
  playerName: string;
  playerHP: number;
  playerMaxHP: number;
  playerMP: number;
  playerMaxMP: number;
}
