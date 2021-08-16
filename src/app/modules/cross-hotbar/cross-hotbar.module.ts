import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrossHotbarComponent} from './cross-hotbar.component';
import {GamepadModule} from "../gamepad/gamepad.module";
import {SetSelectComponent} from './components/set-select/set-select.component';
import {CrossHotbarSetComponent} from './components/cross-hotbar-set/cross-hotbar-set.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ActionsModule} from "../actions/actions.module";


@NgModule({
  declarations: [
    CrossHotbarComponent,
    SetSelectComponent,
    CrossHotbarSetComponent
  ],
  exports: [
    CrossHotbarComponent
  ],
  imports: [
    CommonModule,
    GamepadModule,
    DragDropModule,
    ActionsModule
  ]
})
export class CrossHotbarModule {
}
