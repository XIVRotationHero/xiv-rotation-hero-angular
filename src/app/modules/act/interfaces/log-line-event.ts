import { MessageEvent } from "./message-event";

export interface LogLineEvent extends MessageEvent {
  type: 'LogLine',
  line: string[],
  rawLine: string
}
