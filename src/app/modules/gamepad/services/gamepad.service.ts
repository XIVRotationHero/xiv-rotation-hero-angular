import {Injectable} from '@angular/core';
import {GamepadButtonState} from "../enums/gamepad-button-state";
import {GamepadCache} from "../interfaces/gamepad-cache";
import {fromEvent} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GamepadService {
  private gamepad?: Gamepad;
  private gamepadCache: GamepadCache = {
    buttons: [],
    axes: []
  };
  private _hasUpdate = false;
  public get hasUpdate() {
    return this._hasUpdate;
  }

  public gamepadButtonState: GamepadButtonState[] = [];

  constructor() {
    this.updateGamepadState = this.updateGamepadState.bind(this);

    fromEvent(window, 'gamepadconnected')
      .pipe(map(() => this.onGamepadConnected()))
      .subscribe();

    fromEvent(window, 'gamepaddisconnected')
      .pipe(map(() => this.onGamepadDisconnected()))
      .subscribe();
  }

  hasGamepad() {
    return !!this.gamepad;
  }

  onGamepadConnected() {
    const gamepads = navigator.getGamepads();
    this.gamepad = gamepads[0] ? gamepads[0] : undefined;

    if (!this.gamepad) return;
    this.updateGamepadCache(this.gamepad);
    this.updateGamepadState(this.gamepad);
  }

  onGamepadDisconnected() {
    const gamepads = navigator.getGamepads();
    this.gamepad = gamepads[0] ? gamepads[0] : undefined;
  }

  /**
   * Takes care of updating the button state when there is a controller
   * available
   */
  poll() {
    const newState = navigator.getGamepads()[0];

    if (!newState) {
      return;
    }

    this._hasUpdate = !this.gamepad || this.gamepad.timestamp !== newState.timestamp;
    this.gamepad = newState;

    // Only run the update when actually something changed
    if (this._hasUpdate) {
      this.updateGamepadState(this.gamepad);
    }
  }

  updateGamepadState(gamepad: Gamepad) {
    const gamepadCache = this.gamepadCache;

    // Iterate buttons
    this.gamepadButtonState = gamepad.buttons.map((button, index) => {
      let buttonState: GamepadButtonState = GamepadButtonState.Idle;

      // Pressed
      if (button.value && !gamepadCache.buttons[index]) {
        buttonState = GamepadButtonState.Pressed;
      }

      // Held
      if (button.value && gamepadCache.buttons[index]) {
        buttonState = GamepadButtonState.Held;
      }

      // Released
      if (!button.value && gamepadCache.buttons[index]) {
        buttonState = GamepadButtonState.Released;
      }

      // Idle
      return buttonState;
    })

    this.updateGamepadCache(gamepad);
  }

  updateGamepadCache(gamepad: Gamepad) {
    this.gamepadCache = {
      buttons: gamepad.buttons.map(button => button.value),
      axes: [...gamepad.axes]
    }
  }

}
