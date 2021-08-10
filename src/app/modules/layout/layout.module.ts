import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {DialogModule} from "../dialog/dialog.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
