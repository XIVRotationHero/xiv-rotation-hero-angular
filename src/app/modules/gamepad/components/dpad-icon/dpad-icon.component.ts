import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PSGamepadButton} from "../../enums/ps-gamepad-button";

@Component({
  selector: 'rh-dpad-icon',
  templateUrl: './dpad-icon.component.html',
  styleUrls: ['./dpad-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DpadIconComponent {

  public readonly PSGamepadButton = PSGamepadButton;

}
