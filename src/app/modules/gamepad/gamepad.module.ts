import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamepadIconComponent} from './components/gamepad-icon/gamepad-icon.component';
import {DpadIconComponent} from './components/dpad-icon/dpad-icon.component';
import {ActionButtonsIconComponent} from './components/action-buttons-icon/action-buttons-icon.component';


@NgModule({
  declarations: [
    GamepadIconComponent,
    DpadIconComponent,
    ActionButtonsIconComponent
  ],
  exports: [
    GamepadIconComponent,
    DpadIconComponent,
    ActionButtonsIconComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GamepadModule { }
