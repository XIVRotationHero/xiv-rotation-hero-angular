import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PSGamepadButton} from "../../enums/ps-gamepad-button";

@Component({
  selector: 'rh-action-buttons-icon',
  templateUrl: './action-buttons-icon.component.html',
  styleUrls: ['./action-buttons-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsIconComponent {

  public readonly PSGamepadButton = PSGamepadButton;

}
