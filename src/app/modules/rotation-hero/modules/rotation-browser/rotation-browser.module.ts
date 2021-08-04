import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationBrowserComponent } from './rotation-browser.component';
import {CoreModule} from "../../../../core/core.module";
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    RotationBrowserComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    RotationBrowserComponent
  ]
})
export class RotationBrowserModule { }
