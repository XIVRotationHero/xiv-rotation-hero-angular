import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GamepadType} from "../../enums/gamepad-type";
import {PSGamepadButton} from "../../enums/ps-gamepad-button";

@Component({
  selector: 'rh-gamepad-icon',
  templateUrl: './gamepad-icon.component.html',
  styleUrls: ['./gamepad-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamepadIconComponent {
  @Input() public gamepadType: GamepadType = GamepadType.PS;
  @Input() public button!: PSGamepadButton;

  public buttonClass: string = '';

  public ngOnChanges() {
    this.buttonClass = this.updateButtonClass();
  }

  private updateButtonClass(): string {
    const baseClass = 'rh-gamepad-icon--';

    switch(this.button) {
      case PSGamepadButton.Cross:
        return baseClass + 'cross';
      case PSGamepadButton.Square:
        return baseClass + 'square';
      case PSGamepadButton.Triangle:
        return baseClass + 'triangle';
      case PSGamepadButton.Circle:
        return baseClass + 'circle';
      case PSGamepadButton.L1:
        return baseClass + 'l1';
      case PSGamepadButton.R1:
        return baseClass + 'r1';
      case PSGamepadButton.L2:
        return baseClass + 'l2';
      case PSGamepadButton.R2:
        return baseClass + 'r2';
      case PSGamepadButton.Select:
        return baseClass + 'select';
      case PSGamepadButton.Start:
        return baseClass + 'start';
      case PSGamepadButton.L3:
        return baseClass + 'l3';
      case PSGamepadButton.R3:
        return baseClass + 'r3';
      case PSGamepadButton.Up:
        return baseClass + 'up';
      case PSGamepadButton.Down:
        return baseClass + 'down';
      case PSGamepadButton.Left:
        return baseClass + 'left';
      case PSGamepadButton.Right:
        return baseClass + 'right';
      default:
        return '';
    }
  }
}
