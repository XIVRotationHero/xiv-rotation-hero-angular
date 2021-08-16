import {Component, Input, OnInit} from '@angular/core';
import {GamepadService} from "../gamepad/services/gamepad.service";
import {GamepadButtonState} from "../gamepad/enums/gamepad-button-state";
import {ActiveCrossHotbarSet} from "./enums/active-cross-hotbar-set";
import {PSGamepadButton} from "../gamepad/enums/ps-gamepad-button";
import {animationFrameScheduler, BehaviorSubject, interval, Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {FullCrossHotbarAllocation} from "./components/cross-hotbar-set/cross-hotbar-set.component";
import {HotbarCrossSettings} from "../configuration/interfaces/hotbar-cross-settings";
import {HotbarCustomSettings} from "../configuration/interfaces/hotbar-custom-settings";
import {WxhbInputType} from "./enums/wxhb-input-type";

@Component({
  selector: 'rh-cross-hotbar',
  templateUrl: './cross-hotbar.component.html',
  styleUrls: ['./cross-hotbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossHotbarComponent implements OnInit {

  @Input() hotbarCrossSettings!: HotbarCrossSettings | null;
  @Input() hotbarCustomSettings!: HotbarCustomSettings | null;

  private activeHotbarIndex = 0;
  public inputTimerHandle: any = null;
  public readonly crossHotbarSets: Array<[FullCrossHotbarAllocation, FullCrossHotbarAllocation]> = [];
  private readonly HOTBAR_SET_COUNT = 8;

  private readonly BUTTON_ORDER = [
    PSGamepadButton.Left,
    PSGamepadButton.Up,
    PSGamepadButton.Down,
    PSGamepadButton.Right,
    PSGamepadButton.Square,
    PSGamepadButton.Triangle,
    PSGamepadButton.Cross,
    PSGamepadButton.Circle,
  ];
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

  public readonly activeHotbarSet$: Observable<[FullCrossHotbarAllocation, FullCrossHotbarAllocation]> = this.activeHotbarIndex$.pipe(
      map((activeIndex) => this.crossHotbarSets[activeIndex]),
      shareReplay(1)
  );

  public readonly ActiveCrossHotbarSet = ActiveCrossHotbarSet;
  public readonly WxhbInputType = WxhbInputType;

  constructor(
      private readonly gamepadService: GamepadService
  ) {
  }

  ngOnInit(): void {
    this.createEmptyHotbarSets();

    interval(0, animationFrameScheduler)
        .subscribe(() => {
          this.onTick();
        });
  }

  createEmptyHotbarSets() {
    for (let i = 0; i < this.HOTBAR_SET_COUNT; i++) {
      this.crossHotbarSets.push(
          [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null]
          ]
      );
    }
  }

  onAssignSlot(
      {hotbarId, slotId, actionId}: { hotbarId: number, slotId: number, actionId: number },
      crossHotbarSet: ActiveCrossHotbarSet
  ) {
    console.log('slotting')
    if (crossHotbarSet === ActiveCrossHotbarSet.Left || crossHotbarSet === ActiveCrossHotbarSet.Right) {
      let targetSet = this.crossHotbarSets[hotbarId];

      targetSet[ActiveCrossHotbarSet.Left ? 0 : 1][slotId] = actionId;
    }
  }

  onTick() {
    this.gamepadService.poll();

    // Only update when there are actual updates
    if (!this.gamepadService.hasGamepad() || !this.gamepadService.hasUpdate) {
      return;
    }

    const b = this.gamepadService.gamepadButtonState
    this.updateActiveCrossHotbarSet(b[PSGamepadButton.L2], b[PSGamepadButton.R2]);

    // Check for set selection
    if ([GamepadButtonState.Held, GamepadButtonState.Pressed].includes(b[PSGamepadButton.R1])) {
      this.displaySetSelect = true;

      // Check if any button is pressed
      const [pressedButton] = this.SET_SELECT_ORDER.filter((button) => b[button] === GamepadButtonState.Pressed);

      if (pressedButton !== undefined) {
        this.activeHotbarIndexSubject$.next(this.SET_SELECT_ORDER.indexOf(pressedButton));
      }
    } else if (b[PSGamepadButton.R1] === GamepadButtonState.Released) {
      this.displaySetSelect = false;
    }

    // Get pressed buttons
    const actionIndex = this.BUTTON_ORDER.findIndex((button) => b[button] === GamepadButtonState.Pressed);

    if (this.activeHotbarSide !== null && actionIndex !== -1) {
      // Trigger action

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
  updateActiveCrossHotbarSet(l2ButtonState: GamepadButtonState, r2ButtonState: GamepadButtonState): void {
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
      return;
    }
  }
}
