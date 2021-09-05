import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Action} from "../../interfaces/action";
import {ActionService} from "../../services/action.service";
import {map, share, switchMap, takeUntil} from "rxjs/operators";
import {ReplaySubject, Subject} from "rxjs";

@Component({
  selector: 'rh-cooldown-view',
  templateUrl: './cooldown-view.component.html',
  styleUrls: ['./cooldown-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CooldownViewComponent {
  @Input() set action(action: Action | null) {
    if (action) {
      this.actionSubject$.next(action);
    }
  }

  @Input() displayRecastTime = false;

  private static InstanceID = 0;

  private readonly actionSubject$: Subject<Action> = new ReplaySubject(1);
  private readonly isDestroyed$ = new Subject();
  public readonly instanceId = CooldownViewComponent.InstanceID++;

  private readonly cooldownGroup$ = this.actionSubject$.pipe(
    takeUntil(this.isDestroyed$),
    switchMap((action) => this.actionService.getCooldownGroupForAction(action)),
    share()
  );

  public timeRemainingOnCooldown$ = this.cooldownGroup$
    .pipe(
      map((cooldownGroup) => cooldownGroup ? Math.ceil(cooldownGroup.remaining / 1000) : 0),
      share()
    );

  public isOnCooldown$ = this.cooldownGroup$
    .pipe(
      map((cooldownGroup) => Boolean(cooldownGroup && cooldownGroup.remaining > 0)),
      share()
    );

  public showCooldownTime$ = this.actionSubject$
    .pipe(map(action => action.Recast100ms > 25));

  public remainingPercent$ = this.cooldownGroup$.pipe(
    map((group) => group ? group.remaining / group.duration : 0)
  );

  ngOnDestroy() {
    this.isDestroyed$.next();
  }

  public constructor(private readonly actionService: ActionService) {
  }
}
