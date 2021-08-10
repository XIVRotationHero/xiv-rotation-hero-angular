import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuilderComponent} from './builder.component';
import {RotationPhaseViewComponent} from './components/rotation-phase-view/rotation-phase-view.component';
import {DialogModule} from "../dialog/dialog.module";
import {ActionsModule} from "../actions/actions.module";
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    BuilderComponent,
    RotationPhaseViewComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ActionsModule,
    DragDropModule
  ],
  exports: [
    BuilderComponent
  ]
})
export class BuilderModule { }
