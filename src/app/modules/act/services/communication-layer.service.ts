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
  }

  abstract callOverlayHandler(msg: MessageEvent): Promise<any>;
  abstract startOverlayEvents(): void
}
