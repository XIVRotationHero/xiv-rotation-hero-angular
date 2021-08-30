import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges
} from '@angular/core';
import {Rotation} from "../../../api/interfaces/rotation";
import {CommunicationLayerService} from "../../../act/services/communication-layer.service";
import {ActionService} from "../../../actions/services/action.service";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {map, scan, shareReplay, startWith, switchMap, takeUntil} from "rxjs/operators";
import {PlayerOptions} from "./interfaces/player-options";

@Component({
  selector: 'rh-rotation-player',
  templateUrl: './rotation-player.component.html',
  styleUrls: ['./rotation-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotationPlayerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rotation!: Rotation;
  @Input() playerOptions?: PlayerOptions;

  @Output() changeRotation: EventEmitter<void> = new EventEmitter();
  @Output() favouriteRotation: EventEmitter<void> = new EventEmitter();

  public readonly activePhaseAction$: Observable<[number, number]>;
  public readonly activePhaseIndex$: Observable<number>;
  public readonly activeActionIndex$: Observable<number>;

  private readonly rotationSubject$: ReplaySubject<Rotation> = new ReplaySubject<Rotation>(1);
  private readonly executedActionIds$: Observable<number>;
  private readonly isDestroyed$ = new Subject();

  constructor(
      private readonly actionService: ActionService,
      @Optional() private readonly communicationLayerService?: CommunicationLayerService
  ) {
    if (this.communicationLayerService) {
      this.executedActionIds$ = this.communicationLayerService.actions$.pipe(map((action) => action.attackId));
      this.communicationLayerService.startOverlayEvents();
      this.communicationLayerService.logLineEvents$.subscribe(logLine => console.log(logLine));
    } else {
      this.executedActionIds$ = this.actionService.executedActionIds$;
    }

    this.activePhaseAction$ = this.rotationSubject$.pipe(
        takeUntil(this.isDestroyed$),
        switchMap(
            (rotation) =>
                this.executedActionIds$
                    .pipe(
                        takeUntil(this.isDestroyed$),
                        scan(
                            ([currentPhaseIndex, currentActionIndex]: [number, number], actionId: number) => {
                              const currentPhase = rotation.phases[currentPhaseIndex];
                              const hasMorePhases = !(rotation.phases.length === currentPhaseIndex + 1);

                              if (currentPhase.actions[currentActionIndex] === actionId) {
                                return currentPhase.actions.length === currentActionIndex + 1
                                    ? <[number, number]>[hasMorePhases ? currentPhaseIndex + 1 : 0, 0]
                                    : <[number, number]>[currentPhaseIndex, currentActionIndex + 1]
                              } else {
                                // Wrong action, decide what to do based on failure mode
                              }
                              return <[number, number]>[0, 0];
                            },
                            <[number, number]>[0, 0]
                        ),
                        startWith(<[number, number]>[0, 0]),
                        shareReplay(1)
                    )),
        shareReplay(1)
    );

    this.activePhaseIndex$ = this.activePhaseAction$.pipe(map(val => val[0]));
    this.activeActionIndex$ = this.activePhaseAction$.pipe(map(val => val[1]));
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('rotation')) {
      this.rotationSubject$.next(changes.rotation.currentValue);
    }
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

}
