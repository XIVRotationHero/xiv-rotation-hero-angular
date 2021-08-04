import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDialogComponent } from './components/layout-dialog/layout-dialog.component';
import { LayoutComponent } from './layout.component';
import {DialogModule} from "../dialog/dialog.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LayoutDialogComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutDialogComponent
  ]
})
export class LayoutModule { }
