import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GamepadService} from "../gamepad/services/gamepad.service";
import {GamepadButtonState} from "../gamepad/enums/gamepad-button-state";
import {ActiveCrossHotbarSet} from "./enums/active-cross-hotbar-set";
import {PSGamepadButton} from "../gamepad/enums/ps-gamepad-button";
import {animationFrameScheduler, BehaviorSubject, combineLatest, interval, Observable, Subject} from "rxjs";
import {filter, map, shareReplay, take, takeUntil, withLatestFrom} from "rxjs/operators";
import {FullCrossHotbarAllocation} from "./components/cross-hotbar-set/cross-hotbar-set.component";
import {HotbarCrossSettings} from "../configuration/interfaces/hotbar-cross-settings";
import {HotbarCustomSettings} from "../configuration/interfaces/hotbar-custom-settings";
import {WxhbInputType} from "./enums/wxhb-input-type";
import {ConfigurationService} from "../configuration/services/configuration.service";
import {ActionService} from "../actions/services/action.service";
import {CrossHotbarService} from "./services/cross-hotbar.service";

@Component({
  selector: 'rh-cross-hotbar',
  templateUrl: './cross-hotbar.component.html',
  styleUrls: ['./cross-hotbar.component.scss']
})
export class CrossHotbarComponent implements OnInit, OnDestroy {

  public readonly hotbarCrossSettings$ = this.configurationService.hotbarCrossSettings$;
  public readonly hotbarCustomSettings$ = this.configurationService.hotbarCustomSettings$;

  @Input() hotbarCrossSettings!: HotbarCrossSettings | null;
  @Input() hotbarCustomSettings!: HotbarCustomSettings | null;

  public inputTimerHandle: any = null;

  private readonly SET_SELECT_ORDER = [
    PSGamepadButton.Triangle,
    PSGamepadButton.Circle,
    PSGamepadButton.Cross,
    PSGamepadButton.Square,
    PSGamepadButton.Up,
    PSGamepadButton.Right,
    PSGamepadButton.Down,
    PSGamepadButton.Left,
  ];
  public activeHotbarSide: ActiveCrossHotbarSet = ActiveCrossHotbarSet.None;
  public lastActiveHotbarSide: ActiveCrossHotbarSet = ActiveCrossHotbarSet.None;
  public displaySetSelect = false;

  private readonly activeHotbarIndexSubject$ = new BehaviorSubject(0);
  public readonly activeHotbarIndex$ = this.activeHotbarIndexSubject$.asObservable().pipe(shareReplay(1));
  public readonly crossHotbarSetAllocations$ = this.crossHotbarService.hotbarAllocation$;

  public readonly activeHotbarSet$: Observable<[FullCrossHotbarAllocation, FullCrossHotbarAllocation]> =
      combineLatest([this.activeHotbarIndex$, this.crossHotbarSetAllocations$]).pipe(
          map(([activeIndex, sets]) => sets[activeIndex]),
          shareReplay(1)
      );

  public readonly activeHotbarSetLeft$: Observable<FullCrossHotbarAllocation> = this.activeHotbarSet$.pipe(
      map(([left]) => left)
  );
  public readonly activeHotbarSetRight$: Observable<FullCrossHotbarAllocation> = this.activeHotbarSet$.pipe(
      map(([, right]) => right)
  );

  public readonly ActiveCrossHotbarSet = ActiveCrossHotbarSet;
  public readonly WxhbInputType = WxhbInputType;

  // WXHB allocation
  public readonly wxhbDoubleLtSetting$ = this.hotbarCustomSettings$.pipe(
      map((settings) => settings.displayWithDoubleLt),
      shareReplay(1)
  );
  public readonly wxhbDoubleRtSetting$ = this.hotbarCustomSettings$.pipe(
      map((settings) => settings.displayWithDoubleRt),
      shareReplay(1)
  );
  public readonly wxhbDoubleLt$ = combineLatest([this.wxhbDoubleLtSetting$, this.crossHotbarSetAllocations$]).pipe(
      map(([setting, sets]) => {
        const [hotbar, side] = setting;
        return sets[hotbar][side];
      })
  );
  public readonly wxhbDoubleRt$ = combineLatest([this.wxhbDoubleRtSetting$, this.crossHotbarSetAllocations$]).pipe(
      map(([setting, sets]) => {
        const [hotbar, side] = setting;
        return sets[hotbar][side];
      })
  );

  private triggeredCrossHotbarSlotSubject$: Subject<[number, number]> = new Subject();
  private r1CycleTimer?: number;
  private hasSetChangedDuringR1 = false;

  private readonly R1_CYCLE_TIMER_THRESHOLD = 400;

  private isDestroyed$ = new Subject<void>();

  constructor(
      private readonly gamepadService: GamepadService,
      private readonly configurationService: ConfigurationService,
      private readonly actionService: ActionService,
      private readonly crossHotbarService: CrossHotbarService
  ) {
  }

  ngOnInit(): void {
    interval(0, animationFrameScheduler)
        .pipe(takeUntil(this.isDestroyed$))
        .subscribe(() => {
          this.onTick();
        });

    this.triggeredCrossHotbarSlotSubject$
        .pipe(
            takeUntil(this.isDestroyed$),
            withLatestFrom(this.crossHotbarSetAllocations$, this.activeHotbarIndex$, this.hotbarCustomSettings$),
            map((
                [[activeSet, slotId], allocations, activeHotbarIndex, settings]:
                    [[ActiveCrossHotbarSet, number], [FullCrossHotbarAllocation, FullCrossHotbarAllocation][], number, HotbarCustomSettings]
            ) => {
              let hotbarId: number,
                  side: number;

              switch (activeSet) {
                case ActiveCrossHotbarSet.Left:
                  return allocations[activeHotbarIndex][0][slotId];

                case ActiveCrossHotbarSet.Right:
                  return allocations[activeHotbarIndex][1][slotId];

                case ActiveCrossHotbarSet.WXHBLeft:
                  [hotbarId, side] = settings.displayWithDoubleLt;
                  return allocations[hotbarId][side][slotId];

                case ActiveCrossHotbarSet.WXHBRight:
                  [hotbarId, side] = settings.displayWithDoubleRt;
                  return allocations[hotbarId][side][slotId];

                case ActiveCrossHotbarSet.ExtendedLeft:
                  [hotbarId, side] = settings.displayWithRtLt;
                  return allocations[hotbarId][side][slotId];

                case ActiveCrossHotbarSet.ExtendedRight:
                  [hotbarId, side] = settings.displayWithLtRt;
                  return allocations[hotbarId][side][slotId];

                default:
                  return;
              }
            }),
            filter((value => !!value))
        )
        .subscribe((actionId) => {
          this.actionService.triggerActionId(actionId as number);
        });
  }

  public ngOnDestroy() {
    this.isDestroyed$.next();
  }

  public onAssignSlot(
      {hotbarId, slotId, actionId}: { hotbarId: number, slotId: number, actionId: number },
      crossHotbarSet: ActiveCrossHotbarSet
  ): void {
    this.crossHotbarSetAllocations$.pipe(take(1)).subscribe((allocation) => {
      const side = (crossHotbarSet === ActiveCrossHotbarSet.Left || crossHotbarSet === ActiveCrossHotbarSet.WXHBLeft) ? 0 : 1;
      allocation[hotbarId][side][slotId] = actionId;
      this.crossHotbarService.assignAction(hotbarId, side === 1 ? slotId + 8 : slotId, actionId);
    });
  }

  private onTick(): void {
    this.gamepadService.poll();

    // Only update when there are actual updates
    if (!this.gamepadService.hasGamepad() || !this.gamepadService.hasUpdate) {
      return;
    }

    const b = this.gamepadService.gamepadButtonState
    this.updateActiveCrossHotbarSet(b[PSGamepadButton.L2], b[PSGamepadButton.R2]);

    // Check for set selection
    this.displaySetSelect = this.isSetSelectActive(b);

    this.handleR1Cycling(b);

    this.handleSetSelect(b);
    this.handleActionTriggering(b);
  }

  private isSetSelectActive(b: GamepadButtonState[]): boolean {
    return [GamepadButtonState.Pressed, GamepadButtonState.Held].includes(b[PSGamepadButton.R1])
  }

  private handleR1Cycling(b: GamepadButtonState[]): void {
    if ([GamepadButtonState.Pressed].includes(b[PSGamepadButton.R1])) {
      this.r1CycleTimer = performance.now();
    } else if (b[PSGamepadButton.R1] === GamepadButtonState.Released) {
      if (
          !this.hasSetChangedDuringR1 &&
          (this.r1CycleTimer && performance.now() - this.r1CycleTimer < this.R1_CYCLE_TIMER_THRESHOLD)
      ) {
        // Button press for cycling through hotbars via R1 press
        this.activeHotbarIndex$.pipe(take(1)).subscribe((index) => {
          this.activeHotbarIndexSubject$.next((index + 1) % 8);
        });
      }
      this.hasSetChangedDuringR1 = false;
    }
  }

  private handleSetSelect(b: GamepadButtonState[]): void {
    // Check if any button is pressed
    // during set select
    if (this.displaySetSelect) {
      const [pressedButton] = this.SET_SELECT_ORDER.filter((button) => b[button] === GamepadButtonState.Pressed);

      if (pressedButton !== undefined) {
        this.activeHotbarIndexSubject$.next(this.SET_SELECT_ORDER.indexOf(pressedButton));
        this.hasSetChangedDuringR1 = true;
      }
    }
  }

  private handleActionTriggering(b: GamepadButtonState[]): void {
    // Get pressed buttons
    const actionIndex = this.SET_SELECT_ORDER.findIndex((button) => b[button] === GamepadButtonState.Pressed);

    if (this.activeHotbarSide !== null && actionIndex !== -1) {
      // Trigger action
      this.triggeredCrossHotbarSlotSubject$.next([this.activeHotbarSide, actionIndex]);

      if (this.hotbarCrossSettings?.returnToXhbAfterWxhbInput) {
        if (this.activeHotbarSide === ActiveCrossHotbarSet.WXHBRight) {
          this.activeHotbarSide = ActiveCrossHotbarSet.Right;
        } else if (this.activeHotbarSide === ActiveCrossHotbarSet.WXHBLeft) {
          this.activeHotbarSide = ActiveCrossHotbarSet.Left;
        }
      }
    }
  }

  /**
   * If a new hotbar side is selected it always overrides the previous one.
   * If both keys are held, the later one switches to the extended hotbar side.
   * If one is released it goes back to the still held button.
   */
  private updateActiveCrossHotbarSet(l2ButtonState: GamepadButtonState, r2ButtonState: GamepadButtonState): void {
    if (this.inputTimerHandle) {
      clearTimeout(this.inputTimerHandle);
      this.inputTimerHandle = undefined;
    }

    // Check for extended hotbar state
    if (this.hotbarCustomSettings?.enableExpandedControls) {
      if (l2ButtonState === GamepadButtonState.Pressed && r2ButtonState === GamepadButtonState.Held) {
        this.activeHotbarSide = ActiveCrossHotbarSet.ExtendedRight;
        return;
      } else if (r2ButtonState === GamepadButtonState.Pressed && l2ButtonState === GamepadButtonState.Held) {
        this.activeHotbarSide = ActiveCrossHotbarSet.ExtendedLeft;
        return;
      }
    }

    // Check for pressed state
    if (l2ButtonState === GamepadButtonState.Pressed) {
      this.activeHotbarSide =
          this.lastActiveHotbarSide === ActiveCrossHotbarSet.Left && this.hotbarCustomSettings?.enableWxhbWithDoubleTap
              ? ActiveCrossHotbarSet.WXHBLeft
              : ActiveCrossHotbarSet.Left;
    } else if (r2ButtonState === GamepadButtonState.Pressed) {
      this.activeHotbarSide =
          this.lastActiveHotbarSide === ActiveCrossHotbarSet.Right && this.hotbarCustomSettings?.enableWxhbWithDoubleTap
              ? ActiveCrossHotbarSet.WXHBRight
              : ActiveCrossHotbarSet.Right;
    }

    this.lastActiveHotbarSide = this.activeHotbarSide;
    this.inputTimerHandle = setTimeout(() => {
      this.lastActiveHotbarSide = ActiveCrossHotbarSet.None;
    }, (this.hotbarCrossSettings?.wxhbInputTimer || 10) * 10);

    // Check for released state
    if (l2ButtonState === GamepadButtonState.Released || r2ButtonState === GamepadButtonState.Released) {
      this.activeHotbarSide = ActiveCrossHotbarSet.None;
    }
  }
}
