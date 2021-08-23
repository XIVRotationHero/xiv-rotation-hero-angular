import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuilderComponent} from './builder.component';
import {RotationPhaseViewComponent} from './components/rotation-phase-view/rotation-phase-view.component';
import {DialogModule} from "../dialog/dialog.module";
import {ActionsModule} from "../actions/actions.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BuilderComponent,
    RotationPhaseViewComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ActionsModule,
    DragDropModule,
    MatTooltipModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    BuilderComponent
  ]
})
export class BuilderModule {
}
