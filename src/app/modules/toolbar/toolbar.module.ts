import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ClassJobSelectionComponent } from './components/class-job-selection/class-job-selection.component';
import {CoreModule} from "../../core/core.module";
import {UserModule} from "../user/user.module";

@NgModule({
  declarations: [
    ToolbarComponent,
    ClassJobSelectionComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UserModule
  ]
})
export class ToolbarModule { }
