import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassJobIconComponent } from './components/class-job-icon/class-job-icon.component';
import {GameDataResolver} from "./resolvers/game-data.resolver";
import { ActionIconComponent } from './components/action-icon/action-icon.component';

@NgModule({
  declarations: [
    ClassJobIconComponent,
    ActionIconComponent
  ],
  exports: [
    ClassJobIconComponent,
    ActionIconComponent
  ],
  providers: [
    GameDataResolver
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
