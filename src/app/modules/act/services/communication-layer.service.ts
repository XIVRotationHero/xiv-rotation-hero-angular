import { Injectable } from '@angular/core';
import { LogLineEvent, MessageEvent } from "../interfaces";
import {Observable, Subject} from "rxjs";
import {filter, map, shareReplay} from "rxjs/operators";
import {EventType} from "../enums/event-type";
import {logLineToActionEvent, logLineToRoleChangeEvent} from "../act.utils";

@Injectable({
  providedIn: 'root'
})
export abstract class CommunicationLayerService {

  public messageEvents$: Subject<MessageEvent> = new Subject();
  public logLineEvents$: Observable<LogLineEvent> = this.messageEvents$.pipe(filter((msg) => msg.type === 'LogLine')) as Observable<LogLineEvent>;
  public jobClassChange$ = this.logLineEvents$.pipe(
    filter((msg) => msg.line[0] === EventType.RoleChangeEvent),
    map(logLineToRoleChangeEvent),
    shareReplay(1)
  );
  public actions$ = this.logLineEvents$.pipe(
    filter((msg) => msg.line[0] === EventType.ActionEvent || msg.line[0] === EventType.ActionCastEvent),
    map(logLineToActionEvent)
  );

  protected queue: any[] | null = [];
  protected subscribers: { [ key: string ]: Array<(msg: any) => {}> } = {};
  protected eventsStarted = false;

  protected constructor() {
    (<any>window).dispatchOverlayEvent = this.processEvent.bind(this);
  }

  protected processEvent(msg: MessageEvent) {
    this.messageEvents$.next(msg);
    //
    // if (this.subscribers[msg.type]) {
    //   for (let subscriber of this.subscribers[msg.type]) {
    //     subscriber(msg);
    //   }
    // }
  }
//
//   public addOverlayListener(event: string, cb: (data: any) => any) {
//     if (this.eventsStarted && this.subscribers[ event ]) {
//       console.warn(`A new listener for ${event} has been registered after event transmission has already begun.
// Some events might have been missed and no cached values will be transmitted.
// Please register your listeners before calling startOverlayEvents().`);
//     }
//
//     if (!this.subscribers[ event ]) {
//       this.subscribers[ event ] = [];
//     }
//
//     this.subscribers[event].push(cb);
//   }
//
//   public removeOverlayListener(event: string, cb: (msg: any) => {}) {
//     if (this.subscribers[event]) {
//       let list = this.subscribers[ event ];
//       let pos = list.indexOf(cb);
//
//       if (pos > -1) list.splice(pos, 1);
//     }
//   }

  public parseLogLine(line: LogLineEvent) {}

  abstract callOverlayHandler(msg: MessageEvent): Promise<any>;
  abstract startOverlayEvents(): void
}
