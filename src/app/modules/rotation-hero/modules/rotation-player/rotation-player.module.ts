import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationPlayerComponent } from './rotation-player.component';
import { RotationSummaryComponent } from './components/rotation-summary/rotation-summary.component';
import { PhaseViewComponent } from './components/phase-view/phase-view.component';
import {CoreModule} from "../../../../core/core.module";
import { PhasesViewComponent } from './components/phases-view/phases-view.component';

@NgModule({
  declarations: [
    RotationPlayerComponent,
    RotationSummaryComponent,
    PhaseViewComponent,
    PhasesViewComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    RotationPlayerComponent
  ]
})
export class RotationPlayerModule { }
