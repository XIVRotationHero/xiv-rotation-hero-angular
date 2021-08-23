import {Injectable} from '@angular/core';
import {Action} from "../interfaces/action";
import {animationFrameScheduler, BehaviorSubject, interval, Observable, Subject} from "rxjs";
import {GameDataService} from "../../../core/services/game-data.service";
import {CooldownGroup} from "../interfaces/cooldown-group";
import {
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeScan,
  scan,
  share,
  shareReplay,
  takeWhile,
  timeInterval,
  withLatestFrom
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public readonly executedActions$: Observable<Action>;
  public readonly executedActionIds$: Observable<number>;
  public readonly cooldownGroups$: Observable<{ [cooldownGroup: number]: CooldownGroup }>
  public readonly comboActionIds$: Observable<number[]>;

  private readonly cooldownGroupSubject$: BehaviorSubject<{ [groupdId: number]: CooldownGroup }> = new BehaviorSubject({});

  private readonly triggeredActions$: Subject<Action> = new Subject();

  public constructor(private readonly gameDataService: GameDataService) {
    this.executedActions$ = this.triggeredActions$.pipe(
        withLatestFrom(this.cooldownGroupSubject$),
        filter(([action, cooldownGroups]) => {
          const cg = cooldownGroups[action.CooldownGroup];
          return !cg || cg.start + cg.duration < performance.now();
        }),
        map(([action]) => action),
        share()
    );

    this.executedActionIds$ = this.executedActions$.pipe(
        map((action) => action.ID),
        share()
    );

    this.executedActionIds$.subscribe();

    this.executedActions$.pipe(
        scan(
            (acc, action) => {
              acc[action.CooldownGroup] = {
                start: performance.now(),
                duration: action.Recast100ms * 100,
                remaining: action.Recast100ms * 100
              };
              return acc;
            },
            <{ [groupdId: number]: CooldownGroup }>{}
        )
    )
        .subscribe((val) => {
          this.cooldownGroupSubject$.next(val);
        });

    // Decrease cooldowns
    const interval$ = interval(0, animationFrameScheduler)
        .pipe(timeInterval(), share());

    this.cooldownGroups$ = this.executedActions$.pipe(
        mergeScan(
            (acc, action) =>
                interval$
                    .pipe(
                        scan((acc, value) => ({
                          ...acc,
                          remaining: acc.remaining - value.interval
                        }), {
                          start: performance.now(),
                          duration: action.Recast100ms * 100,
                          remaining: action.Recast100ms * 100
                        }),
                        takeWhile((value) => value.remaining >= 0, true),
                        map((val) => {
                          acc[action.CooldownGroup] = val;
                          return acc;
                        }),
                        finalize(() => delete acc[action.CooldownGroup])
                    )
            ,
            <{ [groupdId: number]: CooldownGroup }>{}
        ),
        share()
    );
    this.cooldownGroups$.subscribe();

    this.comboActionIds$ = this.executedActions$.pipe(
        scan((acc, action) => {
          if (!action.PreservesCombo) {
            acc = [];
          }

          return [...acc, action.ID];
        }, <number[]>[]),
        shareReplay(1)
    );
    this.comboActionIds$.subscribe();
  }

  public getCooldownGroupForAction(action: Action) {
    return this.cooldownGroups$
        .pipe(
            map((cooldownGroups) => cooldownGroups[action.CooldownGroup]),
            distinctUntilChanged(),
        )
  }

  public triggerAction(action: Action) {
    this.triggeredActions$.next(action);
  }

  public triggerActionId(actionId: number) {
    this.triggeredActions$.next(this.gameDataService.getActionById(actionId));
  }
}
