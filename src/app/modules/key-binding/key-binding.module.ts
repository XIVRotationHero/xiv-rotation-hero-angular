import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyBindingDialogComponent } from './components/key-binding-dialog/key-binding-dialog.component';
import {DialogModule} from "../dialog/dialog.module";
import { KeyBindingListComponent } from './components/key-binding-list/key-binding-list.component';



@NgModule({
  declarations: [
    KeyBindingDialogComponent,
    KeyBindingListComponent
  ],
  imports: [
    CommonModule,
    DialogModule
  ],
  exports: [
    KeyBindingDialogComponent
  ]
})
export class KeyBindingModule { }
