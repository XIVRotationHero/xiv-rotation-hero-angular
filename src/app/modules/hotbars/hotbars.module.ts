import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotbarsComponent } from './hotbars.component';
import { HotbarComponent } from './components/hotbar/hotbar.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { HotbarSlotComponent } from './components/hotbar-slot/hotbar-slot.component';
import {ActionsModule} from "../actions/actions.module";



@NgModule({
  declarations: [
    HotbarsComponent,
    HotbarComponent,
    HotbarSlotComponent
  ],
  exports: [
    HotbarsComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ActionsModule
  ]
})
export class HotbarsModule { }
