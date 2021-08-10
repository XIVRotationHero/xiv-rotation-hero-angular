import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActionComponent} from './components/action/action.component';
import {DialogModule} from "../dialog/dialog.module";
import {ActionListComponent} from './components/action-list/action-list.component';
import {CoreModule} from "../../core/core.module";
import {CooldownViewComponent} from './components/cooldown-view/cooldown-view.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ActionByIdPipe} from './pipes/action-by-id.pipe';

@NgModule({
  declarations: [
    ActionComponent,
    ActionListComponent,
    CooldownViewComponent,
    ActionByIdPipe
  ],
  exports: [
    ActionComponent,
    ActionByIdPipe
  ],
  imports: [
    CommonModule,
    DialogModule,
    CoreModule,
    DragDropModule
  ]
})
export class ActionsModule { }
